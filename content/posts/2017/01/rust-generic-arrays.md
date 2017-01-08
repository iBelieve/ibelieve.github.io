---
title: Rust Structs with Generic/Variable-Length Arrays
date: 2017-01-05
layout: Post
---

I’ve been interested in operating systems development for a while, and last year worked on a small hobby kernel in C++, using the excellent resources from http://wiki.osdev.org. Recently, I decided to start on a [new hobby kernel](https://github.com/iBeliever/osdev) using the [Rust programming language](https://github.com/iBeliever/osdev).

Following the great blog series [Writing an OS in Rust](http://os.phil-opp.com/) by Philipp Oppermann and [Bare Metal Rust](http://www.randomhacks.net/bare-metal-rust/) by Eric Kidd, along with referencing my old code, I quickly got a basic "Hello, world" kernel with a VGA module up and working. Then, came memory management...

In my old C++ kernel, I was using a bitmap page frame allocator to track page frames in physical memory. I had made a nice bitmap class using C++ templates that accepted a template parameter for the number of bits in the bitmap:

``` cpp
template <size_t N>
class Bitmap {
    ...

private:
    uint32_t m_data[N / BITS_PER_ITEM];
};
```

Replicating this in Rust seemed easy enough:

``` rust
pub struct Bitmap<N> {
    data: [u64; N/BITS_PER_ITEM]
}
```

Except... it doesn’t work:

```
error[E0425]: unresolved name `N`
 --> kernel/src/bitmap:4:17
  |
4 |     data: [u64; N/BITS_PER_ITEM]
  |                 ^ unresolved name
error[E0080]: constant evaluation error
 --> kernel/src/bitmap:4:17
  |
4 |     data: [u64; N/BITS_PER_ITEM]
  |                 ^ unresolved path in constant expression
error: aborting due to previous error
```

As it turns out, non-type parameters (specifically, constants for controlling the length of an array) are not supported:

http://stackoverflow.com/a/28137604

I came across [generic-array](https://github.com/fizyk20/generic-array), based around [typenum](https://github.com/paholg/typenum), which used some fancy tricks to provide compile-time constants that can be used as generic parameters. There’s even a [bit-array](https://crates.io/crates/bit-array) crate based around `generic-array`. The only problem with this is that with large numbers, `bit-array` gets really slow, and I needed to use a bit array with 1,048,576 bits in it to track all available pages in x86’s 4 GB address space. I’m not sure if that’s because of `bit-array` or `generic-array`, but I’m guessing it might be because `bit-array` is doing some extra stuff to calculate the number of items in the data array based on the number of bits. Anyhow, with Atom’s linter-rust package running cargo every time I save a file and grabbing the global lock on my project, I need a solution that’s fast (plus fast compile times are always nice). The other problem was that `bit-array` and `generic-array` don’t have const `new()` methods, so I can’t use my bitmap allocator in a static mutex.

So...that didn’t work. What about a struct for my bitmap that just accepted an array type as the generic parameter, requiring that I’d have to pass in an array type instead of just the length? I just need to be able to get a reference to the array (or rather a full slice of the array), so something like this seems like it should work:

``` rust
pub struct Bitmap<T: AsRef<u64>> {
    data: T
}
```

Except... it doesn’t. Why? Because all the array traits are only implemented on arrays up to a length of 32. According to the docs:

> This limitation on the size `N` exists because Rust does not yet support code that is generic over the size of an array type. `[Foo; 3]` and `[Bar; 3]` are instances of same generic type `[T; 3]`, but `[Foo; 3]` and `[Foo; 5]` are entirely different types. As a stopgap, trait implementations are statically generated up to size 32.

Great. However, there is another trait that does work: [`core::array::FixedSizeArray`](https://doc.rust-lang.org/nightly/core/array/trait.FixedSizeArray.html). It requires an unstable feature to be enabled, and thus needs nightly Rust, but that’s fine as I’m using the nightly version of Rust with a bunch of other features enabled. So here’s what the struct looks like:

``` rust
pub struct Bitmap<T: FixedSizeArray<u64>> {
    data: T
}
```

This trait has `as_slice()` and `as_mut_slice()` methods, which are exactly what I need. I have to pass an array type in as the generic type instead of just the length, and it needs to be the actual array length, not the number of bits. But, it works for now until proper number constants are supported as generic parameters. You can find the full implementation to my `Bitmap` struct [here](https://github.com/iBeliever/osdev/blob/master/kernel/src/bitmap.rs). So now I have a working [bitmap page frame allocator](https://github.com/iBeliever/osdev/blob/master/kernel/src/arch/x86_64/mem/pmm.rs) for my OS kernel!

If you’re interested in tracking progress on number constants as generic parameters, here’s a GitHub issue and a recent proposal (though the proposal does seem to be rejected and a solution might not be within the Rust team’s 2017 scope):

https://github.com/rust-lang/rfcs/issues/1038
https://github.com/rust-lang/rfcs/pull/1657#issuecomment-268915104
