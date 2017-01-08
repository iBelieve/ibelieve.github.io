---
title: Aurelia Route-Specific Actions in a Navbar
date: 2016-04-28
layout: Post
---

Recently, I've been working on an Aurelia-based webapp for work. I have a basic layout with a bootstrap navbar and different pages linked in the navbar using an Aurelia router. One of the things I wanted to do was have route-specific actions exposed as buttons in the navbar.

In AngularJS, this was quite easy to do:

``` js
$state.current.actions = [...]
```

In Aurelia, it's not so simple. There's no direct way that I've found to access the current route from your route's view model or access the current route's view model from the main `App` view model. However, we can get the current route's view model by doing a bit of digging into the internals of `RouterView`.

It's possible to assign a reference to an HTML element using the [`ref` attribute](http://stackoverflow.com/a/29866395/1917313). However, this is a reference to the HTML element, and is mostly useful for stuff like jQuery (you can do things like `$(this.elementRef)` using refs). Instead, what's more useful is the [`view-model.ref` attribute](http://stackoverflow.com/a/30733738/1917313), which lets us reference a custom element's view model from our current view model.

So, we can get a reference to the `RouterView` view model in our `app.html` file like this:

``` html
<router-view view-model.ref="routerViewModel"></router-view>
```

Now, in our `App` view model in `app.js`, we can get the view model of the current route like this:

``` js
get currentRouteViewModel() {
    const view = this.routerViewModel.view;

    // The view property can be null at first
    return view ? view.controller.viewModel : null;
}
```

Now, from there, we can get a property from the route's view model for displaying actions in the navbar:

``` js
get routeActions() {
    return this.currentRouteViewModel && this.currentRouteViewModel.actions || [];
}
```

We'd declare actions in the route's view model like this:

``` js
export class MyPage {
    constructor() {
        this.actions = [
            {
                text: 'Do Something',
                role: 'primary',
                triggered: () => this.doSomething()
            }
        ]
    }

    doSomething() {
        // Do something amazing!
    }
}
```

Now, we can use `routeActions` in our `app.html`, either for directly displaying actions or for binding them to a navbar component to display there. In my case, I'm displaying the actions as buttons in my Bootstrap navbar like this:

``` html
<button repeat.for="action of actions"
        class="btn btn-${action.role || 'default'} navbar-btn"
        click.delegate="action.triggered()"
        disabled.bind="action.disabled">
  ${action.text}
</button>
```

So, while it isn't extremely obvious how to get actions or any other properties from a route-specific view model, it's certainly possible to do using the `view-model.ref` attribute and a bit of digging in the `RouteView` code.
