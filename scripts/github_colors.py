#! /usr/bin/env python3

import re

import yaml
import requests


url = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml'

def slugify(slug):
    slug = slug.replace('#', 'sharp')
    slug = slug.replace('++', 'pp')
    slug = re.sub(r"[^\w]+", " ", slug)
    slug = "-".join(slug.lower().strip().split())
    return slug

if __name__ == '__main__':
    response = requests.get(url, stream=True)
    if not response.ok:
        print("Are you sure the url [%s] is right?" % url)

    languages = yaml.load(response.text)
    output = {}

    for key, value in languages.items():
        try:
            output[key] = value['color']
        except KeyError:
            continue

    # sass
    with open("assets/sass/_github-colors.scss", 'w') as f:
        f.write('$language-colors: (\n')
        for key, value in output.items():
            f.write('  %s: %s,\n' % (slugify(key), value.upper()))
        f.write(');')
