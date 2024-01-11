<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "App",
        data() {
            return {};
        }
    };
</script>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
    @import url("https://use.fontawesome.com/releases/v5.10.1/css/all.css");

    body {
        overflow: hidden;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }

    * {
        margin: 0 auto;
        outline: none;
    }

    body {
        font-family: "Montserrat", sans-serif;
        background-color: #fafafc;
        font-weight: 400;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        color: #ececec;
    }

    a,
    abbr,
    acronym,
    address,
    applet,
    article,
    aside,
    audio,
    b,
    big,
    blockquote,
    body,
    canvas,
    caption,
    center,
    cite,
    code,
    dd,
    del,
    details,
    dfn,
    div,
    dl,
    dt,
    em,
    embed,
    fieldset,
    figcaption,
    figure,
    footer,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    header,
    hgroup,
    html,
    i,
    iframe,
    img,
    ins,
    kbd,
    label,
    legend,
    li,
    mark,
    menu,
    nav,
    object,
    ol,
    output,
    p,
    pre,
    q,
    ruby,
    s,
    samp,
    section,
    small,
    span,
    strike,
    strong,
    sub,
    summary,
    sup,
    table,
    tbody,
    td,
    tfoot,
    th,
    thead,
    time,
    tr,
    tt,
    u,
    ul,
    var,
    video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline;
    }

    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
        display: none;
    }

    .highlight {
        font-weight: bold;
    }

    .toasted {
        background-color: #353535!important;

        &.error {
            box-shadow: -2px 0 0 rgba(192,57,43, .8)!important;
        }
        &.success {
            box-shadow: -2px 0 0 rgba(46, 204, 113,1.0)!important;
        }
        &.info {
            box-shadow: -2px 0 0 rgba(129, 236, 236,1.0)!important;
        }
    }
    *, *:before, *:after {box-sizing:  border-box !important;}
    input::-moz-focus-inner,
    input::-moz-focus-outer {
        border: 0;
    }
</style>

