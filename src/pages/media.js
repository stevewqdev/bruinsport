import React, { Component } from "react"
import Layout from "../layouts/index"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";
import { globalHistory } from "@reach/router"
import "./css/index.css"
import "./css/media.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsCarrousel from "../components/media/newsCarrousel"
import Img from "gatsby-image"
import ExternalButton from "../components/master/buttons/externalButton"
import BruinLogo from "../images/media/bruin-letter.png"

class MediaPage extends Component {
  changeList(event){
    const clickedElement = event.target,
          type = event.target.getAttribute("data-type")

    if(!clickedElement.classList.contains('active')){
      [...document.querySelectorAll('.type__selector')].map(element => {
        element.classList.remove('active')
      })
      clickedElement.classList.add('active');
    }

    [...document.querySelectorAll('.news__list')].map(element => {
      if(element.id === type){
        if(!element.classList.contains('active')){
          element.classList.add('active')
          element.classList.remove('not__active')
        }
      }else{
        element.classList.add('not__active')
        element.classList.remove('active')
      }
      
    })
  }
  render() {

    const pageData = this.props.data.allWordpressPage.edges[0].node
    const PressData = this.props.data.allWordpressWpPressreleases.edges
    const NewsData = this.props.data.allWordpressWpNews.edges
    const featuredArticles = pageData.acf.featured_media;

    console.log(pageData);
    //Slick Setting
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      centerMode: true,
      autoplay: true,
      autoplaySpeed: 9000,
    };
    return (
      
        <Layout>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={ pageData.title }/>
                <title>{ pageData.title }</title>
                <link rel="canonical" href={globalHistory.location.origin} />
            </Helmet>
            <div className="media__page">
                <section className="container-fluid hero-bg media__featured">
                    <div className="page__background">
                      <Img fluid={pageData.featured_media.localFile.childImageSharp.fluid} />
                    </div>
                    <div className="row text-center">
                      <div className="page__title">
                        <h1>{pageData.acf.page_title}</h1>
                      </div>
                      <Slider className="featured__wrapper" {...settings}>
                        {
                          featuredArticles.map((element, index) => 
                              <div className="featured__article" key={index}>
                                <div className="featured__article__top">
                                  <div className="featured__article__title">
                                    <h3>{element.post_title}</h3>
                                  </div>
                                  <div className="featured__article__subtitle">
                                    <p>{element.acf.subtitle}</p>
                                  </div>
                                  <div className="featured__article__content">
                                    <p>{element.post_content}</p>
                                  </div>
                                </div>
                                <div className="featured__article__divider"></div>
                                <div className="featured__article__bottom">
                                  <div className="featured__article__meta">
                                    <div className="featured__article__date">
                                      <p>{element.post_date}</p>
                                    </div>
                                    <div className="featured__article__source">
                                      <p>{element.acf.source_text}</p>
                                    </div>
                                  </div>
                                  <div className="featured__article__cta">
                                    <ExternalButton redirectionLink={element.acf.external_news_link} buttonText={'Read More'}></ExternalButton>
                                  </div>
                                </div>
                              </div>
                          )
                        }
                      </Slider>
                    </div>
                </section>
                <section className="media__lists">
                  <div className="media__list__background">
                    <img src={BruinLogo} />
                  </div>
                  <div className="container">
                    <div className="row">
                      <h1>{pageData.acf.news_section_title}</h1>
                      <div className="article__type__selector">
                        <button onClick={this.changeList} data-type={'news'} className="type__news type__selector active ">News</button>
                        <button onClick={this.changeList} data-type={'press'} className="type__press type__selector">Press Releases</button>
                      </div>
                      <NewsCarrousel newsArray={NewsData} state={'active'} elId={'news'} />
                      <NewsCarrousel newsArray={PressData} state={'not__active'} elId={'press'} />
                    </div>
                  </div>

                </section>

            </div>
        </Layout>
    )
  }
}
export default MediaPage

export const pageQuery = graphql`
query mediaPageQuery {
  allWordpressPage(filter: {path: {eq: "/media/"}}) {
    edges {
      node {
        id
        title
        content
        date(formatString: "MMMM DD, YYYY")
        featured_media {
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        acf {
          news_section_title
          page_title
          featured_media {
            post_date(formatString: "MMM/ DD / YYYY")
            post_title
            post_content
            acf {
              source_text
              pdf_press_release
              subtitle
              external_news_link
            }
          }
        }
      }
    }
  }
  allWordpressWpPressreleases(limit: 18) {
    edges {
      node {
        title
        date(formatString: "MMM/DD/YYYY")
        acf {
          external_news_link
          pdf_press_release {
            source_url
          }
          subtitle
          source_text
        }
      }
    }
  }
  allWordpressWpNews(limit: 18) {
    edges {
      node {
        title
        date(formatString: "MMM/DD/YYYY")
        acf {
          external_news_link
          subtitle
          source_text
        }
      }
    }
  }
}
`