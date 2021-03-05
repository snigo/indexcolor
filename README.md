# Color | Index Design System

IndexColor is design system of primary colors used in user interface and cli tool that generates these colors. It's based on the principles of color contrast and color intensity.

## Motivation

1. I, as a developer, should not bother what colors to pick, if those colors match and satisfy contrast standards
2. I, as a developer, want my products to look nice and vibrant

## Colors

Colors divided in 3 parts:
1. User colors
2. Neutral colors
3. System colors

### User colors

As name suggests, user colors are those picked by user, that define the color schema of user's brand. We consider 3 main colors:

| Color label      | Description                              | Base color contrast range | Saturation range |
|------------------|------------------------------------------|---------------------------|------------------|
| primary          | Primary UI theme color                   | 3.25 - 6.75               | 0.65 - 1         |
| accent           | Accent color on `primary` background     | -                         | 0.85 - 1         |
| secondary        | Optional secondary UI theme color        | 3.25 - 6.75               | 0.65 - 1         |

User only picks `primary` and `secondary` colors, the rest of the colors are calculated programmatically.

### Neutral colors

We consider 14 neutral colors:

| Color name | Light Mode label | Dark Mode label | Initial Value | n-alias |
|------------|------------------|-----------------|---------------|---------|
| white      | base             | text            | #fff          | n100    |
| snow       | body             | -               | #fafafa       | n98     |
| cloud      | cloud            | -               | #f0f0f0       | n95     |
| lightgray  | line             | head            | #ddd          | n85     |
| silver     | aux              | caption         | #999          | n60     |
| metal      | -                | icon            | #8a8a8a       | n55     |
| gray       | cite             | cite            | #808080       | n50     |
| darkgray   | icon             | -               | #777          | n45     |
| dimgray    | caption          | aux             | #6a6a6a       | n40     |
| jet        | head             | line            | #3a3a3a       | n25     |
| blackcloud | -                | cloud           | #2f2f2f       | n15     |
| blacksnow  | -                | body            | #242424       | n12     |
| carbon     | text             | base            | #202020       | n10     |
| black      | black            | black           | #000          | n0      |


Note the difference between color name and color label, name is mode independent and prefixed with `colors-`, whereas label will have different color depending on the mode and will be prefixed with `color-`.

### System colors

| Color name    | Color label      | Initial Value |
|---------------|------------------|---------------|
| deepblue      | info             | #0a85c2       |
| green         | success          | #2f8e47       |
| red           | warning          | #ee2b3e       |
| amber         | alert            | #fbbc04       |
| purple        | notification     | #a659a6       |

## Opacity

Colors may have up to 4 additional levels of opacity:

| Transparency label | Alpha value |
|--------------------|-------------|
| ghost              | 0.06        |
| haze               | 0.18        |
| semi               | 0.35        |
| overlay            | 0.65        |

## Theme color intensity

Integer from `1` to `9` inclusive. Sets chroma for neutral colors (via `mix` function) and saturation of all user colors

## Theme color contrast

Integer from `1` to `5` inclusive. Contrast difference between colors, where `1` is minimum acceptable (some color combination might be out of acceptable WCAG 2.0 range) and `5` is maximum possible.

## Style Attributes

### Theme modes

Attribute label: **`sa-theme-mode`**

| value | alias | description              |
|-------|-------|--------------------------|
| 0     | light | Sets theme to light mode |
| 1     | dark  | Sets theme to dark mode  |

### Color Profile

Attribute label: **`sa-color`**

| value          | description                              |
|----------------|------------------------------------------|
| `color-label`  | Sets `--profile-color` to specific color |

### Fill Mode

Attribute labels: **`sa-fill`** and **`sa-focus`**

| value                  | `color`                   | `background-color`       |
|------------------------|---------------------------|--------------------------|
| normal                 | `--profile-color`         | `inherit`                |
| dark                   | `--profile-color`         | `--colors-blacksnow`     |
| light                  | `--profile-color`         | `--colors-snow`          |
| blank                  | `--profile-color`         | `transparent`            |
| accent                 | `--profile-color`         | `color-accent`           |
| ghost                  | `--profile-color-ghost`   | `inherit`                |
| haze                   | `--profile-color-haze`    | `inherit`                |
| semi                   | `--profile-color-semi`    | `inherit`                |
| overlay                | `--profile-color-overlay` | `inherit`                |
| inverse                | `inherit`                 | `--profile-color`        |
| inverse-dark           | `--colors-carbon`         | `--profile-color`        |
| inverse-white          | `--colors-white`          | `--profile-color`        |
| inverse-accent         | `color-accent`            | `--profile-color`        |
| inverse-ghost          | `inherit`                 | `--profile-color-ghost`  |
| inverse-ghost-self     | `--profile-color`         | `--profile-color-ghost`  |
| inverse-haze           | `inherit`                 | `--profile-color-haze`   |
| inverse-haze-self      | `--profile-color`         | `--profile-color-haze`   |
| inverse-semi           | `inherit`                 | `--profile-color-semi`   |
| inverse-semi-self      | `--profile-color`         | `--profile-color-semi`   |
| inverse-overlay        | `inherit`                 | `--profile-color-overlay`|
| inverse-overlay-dark   | `--colors-carbon`         | `--profile-color-overlay`|
| inverse-overlay-white  | `--colors-white`          | `--profile-color-overlay`|