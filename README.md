Animated Menu Icon with CSS (SCSS)
==================================

*Author: [Konrad Rolof](http://www.konrad-rolof.de)*

> How to animate a burer icon to a close-cross icon just with CSS. The internet
is full of short code snipets, codepen and JSFiddle sites. Every time I code
a new website I start from zero to write the styles for this animation. I
prefer the animations from [this codepen](https://codepen.io/designcouch/pen/Atyop)
by [Jesse Couch](https://codepen.io/designcouch/).  
I'm boared to write the SCSS again and again. So for all lazy coders: here
is all you need ready to take!

# The two good morph animations

To display a good clickable shape add a circle *(40px × 40px)* around the
burger icon. It is not required but useful for a good UE.

To change the state of the icons I toggle the CSS-class-selector `.open-menu`
at the DOM-element body with [jQuery](http://jquery.com/). I need this class-selector
also to open and close an off-canvas-navigation.

## Animation one

This burger animation needs three `<span>` tags for three bars of the icon.

```html
<a href="#" class="menu-button">
    <span class="burger-icon burger-1">
        <span></span>
        <span></span>
        <span></span>
    </span>
<a>
```

## Animation two

This burger animation needs four `<span>` tags for four bars of the icon.
But don't worry every time you see just two or three.

```html
<a href="#" class="menu-button">
    <span class="burger-icon burger-2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </span>
<a>
```

# Installation

* Clone or [download](https://github.com/KonradRolof/animatedMenuIcon/archive/master.zip) project from [GitHub](https://github.com/KonradRolof/animatedMenuIcon)
* Install with [bower.io](https://bower.io)  
`$ bower install animated-menu-icon --save-dev`
* You just need the markup and the burger icon styles

# SCSS Options

Option | Value | Description
--- | --- | ---
$link-background | CSS color value | Background color of the circle element.
$link-width | CSS width | Width of the circle element.
$link-height | CSS height | Height of the circle element. Should be the same value as width.
$link-margin | CSS margin shorthanded | Margin of the circle element in shorthand style.
$material-hover | Bool | Changes the hover style of the circle element. (Animate background-color or text-shadow)
$burger-width | CSS width | Width of the burger icon. Should be smaller as the circle element.
$burger-height | CSS height | Height of the burger icon. Should be smaller as the circle element.
$line-weight | CSS height | Height of the burger icon bars.
$line-color | CSS color | Color of the burger icon bars.

If you want to change the size of the circle and burger icon, you have to play a little bit until it looks good.

# License

[See GNU GENERAL PUBLIC LICENSE here](https://github.com/KonradRolof/animatedMenuIcon/blob/master/LICENSE)

