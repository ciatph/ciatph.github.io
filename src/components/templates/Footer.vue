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
        b-col(sm="3")
          // Partners Note
          h4 Partners
          p CGIAR-CCAFS is led by the International Center for Tropical Agriculture (CIAT).
          p The Department of Agriculture (DA) is an official partner of the International Center for Tropical Agriculture (CIAT).
        b-col(sm="2" style="margin-left: 1%;")
          // Outputs Note
          h4 Output
          ul(style="list-style: none;")
            li
              i(class="far fa-file-alt")
              a(href="/#/crads") Decision Support Platform (CRA-DS)
            li
              router-link(to="/maps" tag="a") Climate Risk Vulnerability Assessment (CRVA)
            li
              a(href="/#/me") Monitoring and Evaluation (M&E)
            li
              a(href="http://cbatool.ciat.cgiar.org/") CBA Tool

        b-col(sm="3" class="glyph-custom")
          // Contact Note
          h4 Contact

          // Philippines Office
          p(class="contacts")
            span(class="contact-header") CIAT Philippine Country Office
            br
            span c/o UPLB Foundation Inc., UPLB, College, Laguna 4030
            br
            span Contact: Mylene Aquino, Country Administrative Officer
            br
            span Phone: +63 49 5010581
            br
            span Email: mylene.aquino@cgiar.org

          // Vietnam Office
          p(class="contacts")
            span(class="contact-header") CIAT Asia Regional Office
            br
            span c/o Agricultural Genetics Institute
            br
            span Pham Van Dong Street, Tu Liem, Hanoi, Vietnam
            br
            span Contact: Dr. Dindo M. Campilan, Director for Asia
            br
            span Phone: +84 4 37576969
            br
            span Fax: +84 4 37570999

          // Dept. of Agriculture
          p(class="contacts")
            span(class="contact-header") Department of Agriculture – Systems-Wide Climate Change Office (DA-SWCCO)
            br
            span Adaptation and Mitigation Initiative in Agriculture (AMIA) Project
            br
            span Department of Agriculture Compound, Elliptical Road, Diliman
            br
            span Quezon City, PHILIPPINES 1104
            br
            span Contact: U-Nichols Manalo, Director
            br
            span Phone: +63 2 273-2489
            br
            span Email: climatechange.da@gmail.com

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
