import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
import "./css/index.css"
import "./css/about.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img from "gatsby-image"

class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  handleAccordion(event){
      if(event.target.classList.contains('--open')){
        event.target.classList.remove('--open');
      }else{
        if([...document.querySelectorAll('.values__information.--open')].length > 1){
            document.querySelectorAll('.values__information.--open')[0].classList.remove('--open')
        }
        event.target.classList.add('--open');
      }

  }
  render() {
    // This variable will return all the fields related to the post
    const pageData = this.props.data.allWordpressPage.edges[0].node
    const pageAcf = this.props.data.allWordpressPage.edges[0].node.acf

    //Slick Setting
    let settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        responsive: [
            {
              breakpoint: 769,
              settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
          ]
    }

    return (
      <Layout>
        <Helmet>
            <meta charSet="utf-8" />
            <meta name="description" content={ pageData.yoast_meta.yoast_wpseo_metadesc }/>
            <title>{ pageData.yoast_meta.yoast_wpseo_title }</title>
            <link rel="canonical" href={ pageData.yoast_meta.yoast_wpseo_canonical} />
        </Helmet>
        <div className="about">
            <section className="about__header">
                <div className="page__background">
                    <Img fluid={pageData.featured_media.localFile.childImageSharp.fluid} alt={''} tabIndex={-1}/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 about__header__top">
                            <div className="about__header__top__title">
                                <h1 className={'text-white'}>{pageAcf.title}</h1>
                            </div>
                            <div className="about__header__top__subtitle">
                                <h3 className="text-white">{pageAcf.subtitle}</h3>
                            </div>
                        </div>
                        <div className="col-md-12 col-xl-6 about__header__column__one">
                            <div className={'text-white'} dangerouslySetInnerHTML={{__html: pageAcf.first_column_text}} />
                        </div>
                        <div className="col-md-12 col-xl-6 about__header__column__two">
                            <div className={'text-white'} dangerouslySetInnerHTML={{__html: pageAcf.second_column_text}} />
                        </div>
                    </div>
                </div>
            </section>
        
            <section className="mis__vals__soc">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 mission">
                            <h2 className=" ">{pageAcf.mission_title}</h2>
                            <div dangerouslySetInnerHTML={{__html: pageAcf.mission_copy}} />
                        </div>
                        <div className="col-md-12 col-xl-6 values">
                            <h2 className=" ">{pageAcf.values_title}</h2>
                            <div className="values__wrapper">
                                {
                                    pageAcf.values_blocks.map((value, index) => (
                                        <div className={`values__information ${index === 0 ? "--open" : " "} `} key={`${value.title}-${index}`} onClick={this.handleAccordion}>
                                            <div className="values__information__inner">
                                                <p>{value.title}</p>
                                                <div className="values__description">
                                                    <div dangerouslySetInnerHTML={{__html: value.description}} />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-md-12 col-xl-6 social">
                            <h2 >{pageAcf.social_title}</h2>
                            <div dangerouslySetInnerHTML={{__html: pageAcf.social_copy}} />
                            <div className="social__logo">
                                <div className="row">
                                    <div className="col-lg-5 social__logo__left">
                                        <div className="gray__line"></div>
                                    </div>
                                    <div className="col-lg-7 social__logo__right">
                                        <Img fixed={pageAcf.social_logo.localFile.childImageSharp.fixed} alt={'Save the childran logo'}/> 
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        
            <section className="history">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <h2 className="text-center">
                                    {pageAcf.history_title}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="page__background">
                        <Img fluid={pageAcf.history_background.localFile.childImageSharp.fluid} alt={''} tabIndex={-1}/>
                    </div>
                    <div className="container history__timeline">
                    <Slider className="row featured__wrapper" {...settings}>
                        {
                            pageAcf.history_timeline.map((element, index) => (
                                <div className="history__timeline__moment col-md-12" key={`${element.date}-${index}`}>
                                    <div className="history__timeline__moment__date">
                                        <p>{element.date}</p>
                                    </div>
                                    <div className="history__timeline__moment__description">
                                        <div className={'text-white'} dangerouslySetInnerHTML={{__html: element.description}} />
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </section>
        </div>
      </Layout>
    )
  }
}
export default AboutPage

export const pageQuery = graphql`
query AboutQuery {
    allWordpressPage(filter: {path: {eq: "/about/"}}) {
      edges {
        node {
          id
          title
          content
          date(formatString: "MMMM DD, YYYY")
          featured_media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 4000, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          yoast_meta {
            yoast_wpseo_metadesc
            yoast_wpseo_title
            yoast_wpseo_canonical
          }
          acf {
            title
            subtitle
            first_column_text
            second_column_text
            mission_title
            mission_copy
            values_title
            values_blocks {
              description
              title
            }
            social_title
            social_copy
            social_logo {
                localFile {
                    childImageSharp {
                        fixed(width: 300, quality: 100) {
                        ...GatsbyImageSharpFixed_withWebp
                        }
                    }
                }
            }
            history_title
            history_timeline {
              date
              description
            }
            history_background {
                localFile {
                    childImageSharp {
                        fluid(maxWidth: 4000, quality: 100) {
                        ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
          }
        }
      }
    }
  }
`