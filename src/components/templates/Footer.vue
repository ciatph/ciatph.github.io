<template lang="pug">
  div
    // Divider
    div(class="divider-footer")
    // Partner Logos
    b-container(fluid style="padding-top: 40px; padding-bottom: 0px;")
      b-row
        b-col(sm="2")
        b-col(sm="8" class="text-center" style="margin-auto; padding-left: 2%;")
          div(class="thumbnail-footer logo-footer thumbnail-logo-footer")
            img(src="../../assets/logos/logo-ccafs.png")
          div(class="thumbnail-footer logo-footer thumbnail-logo-footer")
            img(src="../../assets/logos/logo-ciat.png")
          div(class="thumbnail-footer logo-footer thumbnail-logo-footer")
            img(src="../../assets/logos/logo-da-amia.png")
        b-col(sm="2")
    // Footer Content
    b-container(fluid style="padding-top:20px;")
      b-row(class="footer-style")
        b-col(sm="2")
        b-col(sm="4" style="padding-right:40px;")
          // Partners Note
          h4 Partners
          p CGIAR-CCAFS is led by the International Center for Tropical Agriculture (CIAT).
          p The Department of Agriculture (DA) is an official partner of theInternational Center for Tropical Agriculture (CIAT).
        b-col(sm="2")
          // Outputs Note
          h4 Output
          ul
            li
              a(href="#") Documents
            li
              router-link(to="/maps" tag="a") CRVA Maps
            li
              a(href="http://cbatool.ciat.cgiar.org/") CBA Tool
        b-col(sm="2" class="glyph-custom")
          // Contact Note
          h4 Contact
          ul
            li(style="float:left;") Dindo M. Campilan
            br
            span D.Campilan@CGIAR.ORG
        b-col(sm="2")
    // Social Media Icons
    b-container(fluid)
      b-row(class="divider-social")
        b-col(sm="2")
        b-col(sm="8")
          ul(class="social-icons" style="float:right;")
            li
              a(href="https://www.facebook.com/ciat.ecoefficient/" target="_blank" class="social-icon")
                i(class="fa fa-facebook")
            li
              a(href="https://twitter.com/ciat_" target="_blank" class="social-icon")
                i(class="fa fa-twitter")
            li
              a(href="https://plus.google.com/u/0/108450629835130532513" target="_blank" class="social-icon")
                i(class="fa fa-google-plus")
        b-col(sm="2")
</template>

<script>
export default {
  name: 'Footer'
}
</script>
