#!/bin/bash

# repo: https://github.com/w3c/csswg-drafts

url="https://drafts.csswg.org/css2/"

download () {
  echo "$1"
  curl -o $1 "$url$1"
}

download_all () {
    # index.html uses diffrent style
    # curl -o index.html $url

    # Overview.html is a 404 page
    # download Overview.html

    # TOC
    download cover.html

    download about.html
    download intro.html
    download conform.html
    download syndata.html
    download selector.html
    download cascade.html
    download media.html
    download box.html
    download visuren.html
    download visudet.html
    download visufx.html
    download generate.html
    download page.html
    download colors.html
    download fonts.html
    download text.html
    download tables.html
    download ui.html
    download aural.html
    download refs.html
    download changes.html
    download sample.html
    download zindex.html
    download propidx.html
    download grammar.html
    download indexlist.html
}

cd $(dirname $(realpath $0))
[ $? -ne 0 ] && exit

if [ "$1" = "all" ]; then
    download_all
elif [ "$1" ]; then
    download $1
else
    echo 'Please specify a html name'
fi
