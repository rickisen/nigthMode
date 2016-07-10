import Color           from '../Classes/Color';

export default class redeclareDefaultColors {
  constructor() {
      this.defaultColorCss = `
        abbr { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        a { color: rgb(0, 0, 238); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 238); outline-color rgb(0, 0, 238); }
        article { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        audio { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        b { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        blockquote { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        body { color: rgb(0, 0, 0); background-color: rgba(255, 255, 255, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        button { color: rgb(0, 0, 0); background-color: rgb(221, 221, 221); border-color rgb(221, 221, 221); outline-color rgb(0, 0, 0); }
        button { color: rgb(128, 128, 128); background-color: rgb(221, 221, 221); border-color rgb(221, 221, 221); outline-color rgb(128, 128, 128); }
        canvas { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        caption { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        circle { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        cite { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        code { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        dd { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        del { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        dfn { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        div { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        dl { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        dt { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        em { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        fieldset { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(192, 192, 192); outline-color rgb(0, 0, 0); }
        figcaption { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        figure { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        footer { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        form { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        h1 { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        h2 { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        h3 { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        h4 { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        h5 { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        h6 { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        head { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        header { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        hr { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        html { color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        i { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        iframe { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        img { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        input { color: rgb(0, 0, 0); background-color: rgb(221, 221, 221); border-color rgb(169, 169, 169); outline-color rgb(0, 0, 0); }
        input { color: rgb(0, 0, 0); background-color: rgb(221, 221, 221); border-color rgb(221, 221, 221); outline-color rgb(0, 0, 0); }
        input { color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        input { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        input { color: rgb(128, 128, 128); background-color: rgb(221, 221, 221); border-color rgb(221, 221, 221); outline-color rgb(128, 128, 128); }
        input { color: rgb(157, 150, 142); background-color: rgb(255, 255, 255); border-color rgb(157, 150, 142); outline-color rgb(157, 150, 142); }
        ins { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        kbd { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        label { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        legend { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        li { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        main { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        mark { color: rgb(0, 0, 0); background-color: rgb(255, 255, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        meta { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        meter { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        nav { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        ol { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        optgroup { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        option { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        p { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        pre { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        progress { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        q { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        samp { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        s { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        section { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        select { color: rgb(0, 0, 0); background-color: rgb(221, 221, 221); border-color rgb(169, 169, 169); outline-color rgb(0, 0, 0); }
        small { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        strong { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        sub { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        sup { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        table { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(128, 128, 128); outline-color rgb(0, 0, 0); }
        tbody { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(128, 128, 128); outline-color rgb(0, 0, 0); }
        td { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        textarea { color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); border-color rgb(169, 169, 169); outline-color rgb(0, 0, 0); }
        tfoot { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(128, 128, 128); outline-color rgb(0, 0, 0); }
        th { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        thead { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(128, 128, 128); outline-color rgb(0, 0, 0); }
        time { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        title { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        tr { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(128, 128, 128); outline-color rgb(0, 0, 0); }
        u { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        ul { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        var { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
        video { color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0); border-color rgb(0, 0, 0); outline-color rgb(0, 0, 0); }
    `;

    this.applyEffect();
  }

  applyEffect() {
    let elem = document.createElement('style');
    elem.type = 'text/css';

    if (elem.styleSheet) {
      elem.styleSheet.cssText = this.defaultColorCss;
    } else {
      elem.appendChild(document.createTextNode(this.defaultColorCss));
    }

    document.head.insertBefore(elem, document.head.firstChild);
  }

  generateDefaultCss() {
    var elems = document.getElementsByTagName('*');
    for (var i = 0, len = elems.length; i < len; i++) {
      let elem = elems[i];
      console.log( elem.tagName.toLowerCase() + ` { color: ${getComputedStyle(elem).color}; background-color: ${getComputedStyle(elem).backgroundColor}; border-color ${getComputedStyle(elem).borderColor}; outline-color ${getComputedStyle(elem).outlineColor}; } `);
    }
  }
}

