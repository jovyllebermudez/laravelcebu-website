import React from "react";
import { Container } from "react-responsive-grid";
import { Link } from "react-router";
import { prefixLink } from "gatsby-helpers";
import Headroom from "react-headroom";
import "../css/markdown-styles";
import "../css/styles";

// Add our typefaces.
import "typeface-poppins";
import "typeface-work-sans";
import "typeface-space-mono";

import { rhythm } from "../utils/typography";
import {
  Header,
  Navigation,
  Toggle,
  Logo,
  StyledLink,
  NavigationLink,
  Footer,
  Copyright,
  Credits,
  IconLink,
  SocialLinks
} from "../utils/components";
import { Slack, Facebook, Github, Meetup } from "../assets/logos.js";

export default class Template extends React.Component {
  constructor(props) {
    super(props);
    const undef = typeof window !== "undefined";
    this.state = {
      menu: false,
      transcript: undef ? (window.innerWidth < 768 ? false : true) : false,
      toc: true,
      width: undef ? window.innerWidth : null
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (this.onMobile()) {
      const { transcript, toc } = this.state;
      if (!transcript || !toc) {
        this.setState({
          transcript: true,
          toc: true
        });
      }
    }
  };

  onMobile = () => window.innerWidth <= 768;

  toggle = item => () => {
    this.setState(prevState => ({
      [item]: !prevState[item]
    }));
  };

  close = item => () => {
    if (this.onMobile()) {
      this.setState({
        [item]: false
      });
    }
  };

  render() {
    const { menu, transcript, toc } = this.state;
    const closeMenu = this.close("menu");

    const children = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        transcript,
        toc,
        toggle: this.toggle,
        close: this.close
      })
    );

    return (
      <div style={{ position: menu ? "fixed" : "inherit" }}>
        <Headroom disableInlineStyles>
          <Header>
            <Logo to={prefixLink("/")} onClick={closeMenu}>
              LaravelCebu
            </Logo>
            <Toggle onClick={this.toggle("menu")} active={menu} />
            <Navigation role="navigation" style={{ top: menu ? 0 : "-100vh" }}>
              <NavigationLink
                to={prefixLink("/schedule/")}
                title="Meetup Schedule"
                onClick={closeMenu}
              >
                Meetup Schedule
              </NavigationLink>
              <NavigationLink
                to={prefixLink("/learning/")}
                title="Learning"
                onClick={closeMenu}
              >
                Learning
              </NavigationLink>
              <NavigationLink
                to="https://www.facebook.com/groups/laravelcebujobs/"
                title="Transcripts"
                target="_blank"
              >
                Jobs
              </NavigationLink>
            </Navigation>
          </Header>
        </Headroom>
        <Container
          style={{
            maxWidth: 1192,
            padding: `0 ${rhythm(3 / 4)} ${rhythm(1)} ${rhythm(3 / 4)}`,
            marginBottom: 70
          }}
        >
          {children}
        </Container>
        <div class="fb-customerchat" page_id="1221595687860839"></div>
        <Footer>
          <div>
            <Copyright>© 2018 Laravel Cebu</Copyright>
            <Credits>
              {"Forked design from "}
              <StyledLink
                target="_blank"
                href="https://www.reactiflux.com/"
                title="Reactiflux"
                rel="nofollow"
              >
                Reactiflux
              </StyledLink>
              {". Coded in "}
              <StyledLink
                target="_blank"
                href="https://www.sublimetext.com/"
                title="Sublime Text"
                rel="nofollow"
              >
                Sublime Text
              </StyledLink>
              {". Built using "}
              <StyledLink
                target="_blank"
                href="https://github.com/gatsbyjs/gatsby"
                title="Gatsby"
                rel="nofollow"
              >
                Gatsby.js
              </StyledLink>
              {". Hosted on "}
              <StyledLink
                target="_blank"
                href="https://www.netlify.com/"
                title="Netlify"
                rel="nofollow"
              >
                Netlify
              </StyledLink>
              .
            </Credits>
          </div>
          <SocialLinks>
            <IconLink
              to="https://github.com/laravelcebu"
              tittle="Laravel Cebu GitHub organization"
              src={Github}
              alt="Github"
              target="_blank"
            />
            <IconLink
              to="https://laravel-cebu.slack.com/"
              tittle="Laravel Cebu Slack"
              src={Slack}
              alt="Slack"
              target="_blank"
            />
            <IconLink
              to="https://www.facebook.com/laravelcebu/"
              title="Laravel Cebu Facebook Page"
              src={Facebook}
              alt="Facebook"
              target="_blank"
            />
          </SocialLinks>
        </Footer>
      </div>
    );
  }
}
