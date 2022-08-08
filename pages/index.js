import { useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'

import gsap, {TimelineMax} from "gsap";


import ContactForm from '../components/ContactForm';


export default function Home() {


  useEffect(() => {
    //check if prefers-reduced-motion: reduce
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    
    if (!prefersReducedMotion.matches) {

      const {ScrollTrigger} = require("gsap/ScrollTrigger");

      console.log("SCROLL TRIGGER", ScrollTrigger);

      gsap.registerPlugin(ScrollTrigger);

      //functions to play /stop video
      const playVideo = () => {
        const v = document.getElementById('covervid');
        v.play();
      }
      
      const pauseVideo = () => {
        const v = document.getElementById('covervid');
        v.pause();
      }

      //HERO splash background section trigger
      const bg_tl = gsap.timeline()
      .add("start")
      .to("#bg_layer1", { lazy: false, duration: 1, scale: 1.05, y: 15 }, "start")
      .to("#bg_layer2", { lazy: false, duration: 1, y: 35 }, "start")
      .to("#bg_layer3", { lazy: false, duration: 1, y: 25 }, "start");
      ScrollTrigger.create({
        animation:bg_tl,
        trigger: "#hero-section",
        start: "top top",
        end: "20%",
        scrub:true,
        invalidateOnRefresh:false,
      });
      

      //video section scroll trigger
      const tl_vid = gsap.timeline()
        .add('start')
        .from("#vid-blurb", { duration: 1, x: -200, opacity: 0, lazy:false },"start")
        .from("#vid-contact", { duration: 1, x: 200, opacity: 0, lazy:false },"start");

      ScrollTrigger.create({
        animation:tl_vid,
        trigger: "#video-section",
        start: "top top",
        pin:true,
        pinSpacing: true,
        anticipatePin: 1,
        end: "20%",
        invalidateOnRefresh:false,
        onToggle: self => {
          console.log("toggled, isActive:", self.isActive)
          if (self.isActive) {
            gsap.to("#overlay", { duration: 1.5, opacity: 0.6 });
            if (document.getElementById('play_controls').dataset.is_paused == "PAUSE") {
              playVideo();
            }
          } else {
            gsap.to("#overlay", { duration: 1.5, opacity: 1 });
            pauseVideo();
          }
        },
        // onUpdate: self => {
        //   console.log("progress:", self.progress.toFixed(3), "direction:", self.direction, "velocity", self.getVelocity());
        // }
      });

      //introduction section scroll trigger
   
      const expanding_tl = gsap.timeline()
        .from(".state-circle", { lazy: false, duration: 1, scale: 0, opacity: 0 });

      gsap.from("#open-blurb", { 
          scrollTrigger: "#intro-section",
          duration: 0.7, 
          y:200, 
          opacity: 0,
          lazy: false
      });

      ScrollTrigger.create({
        animation:expanding_tl,
        trigger: "#intro-section",
        start: "top top",
        end: "20%",
        scrub:1,
        invalidateOnRefresh:false,
      });

      //removal section scroll trigger
      const remove_tl = gsap.timeline()
      .add("start")
      .to(
        "#sawguy-img",
        { lazy: false, duration:.5, left: "35%", ease: "back" },
      )
      .to(
        "#treetop-img",
        { lazy: false, duration: .5, rotate:"90deg", right:'-4%', ease: "back", delay:.5 }, "start"
      );
      ScrollTrigger.create({
        animation:remove_tl,
        trigger: "#removalsection",
        start: "top top",
        pin:true,
        pinSpacing: true,
        anticipatePin: 1,
        //pinType: "transform",
        scrub:true,
        end: "50%",
      });

    
      //trim section scroll trigger
       const trim_tl = gsap.timeline()
      .add("start")
      .to(
        "#lifttruck-img",
        { lazy: false, duration: 1, right: "30%", ease: "power3" },
        "start"
      )
      .to(
        "#liftbasket-img",
        { lazy: false, duration: 1, top: "43%", right: "33%", ease: "power3" },
        "start"
      );
      ScrollTrigger.create({
        animation:trim_tl,
        trigger: "#trim-section",
        start: "top top",
        pin:true,
        pinSpacing: true,
        anticipatePin: 1,
        //pinType: "transform",
        scrub:true,
        end: "50%",
      });

      //stump section scroll trigger
      const stump_tl = gsap.timeline()
      .add("start")
      .to(
        "#pulltruck-img",
        { lazy: false, duration: 1, left: "23%", ease: "power3" },
        "start"
      )
      .to(
        "#hook-img",
        { lazy: false, duration: 1, left: "22%", rotate: "45deg", ease: "power3" },
        "start"
      )
      .to(
        "#stump-img",
        { lazy: false, duration: 1, left: "5%", rotate: "45deg", ease: "power3" },
        "start"
      )
      .add("move")
      .to(
        "#pulltruck-img",
        { lazy: false, duration: 1, left: "73%", ease: "power3" },
        "move"
      )
      .to(
        "#hook-img",
        { lazy: false, duration: 1, left: "72%", rotate: "45deg", ease: "power3" },
        "move"
      )
      .to(
        "#stump-img",
        { lazy: false, duration: 1, top:"15%", left: "55%", rotate: "90deg", ease: "power3" },
        "move"
      );
      ScrollTrigger.create({
        animation:stump_tl,
        trigger: "#stump-section",
        start: "top top",
        pin:true,
        pinSpacing: true,
        anticipatePin: 1,
        //pinType: "transform",
        scrub:true,
        end: "50%",
      });

      //arborist section scroll trigger
      const treezoom_tl = gsap.timeline()
      .add("start")
      //treezoom_tl.from('#goof',{duration:.7, opacity:0, x:200},'start');
      .to(
        ".tree-zoom-mag",
        { lazy: false, duration: 1, right: "-20px", top: "65px" },
        "start"
      )
      .to(
        ".tree-zoom-mag-inner",
        { lazy: false, duration: 1, backgroundPosition: "-175px -220px" },
        "start"
      );
      ScrollTrigger.create({
        animation:treezoom_tl,
        trigger: "#arborist-section",
        start: "top top",
        pin:true,
        pinSpacing: true,
        anticipatePin: 1,
        //pinType: "transform",
        scrub:true,
        end: "50%",
      });
      
    }
  }, []);

  const togglePause = (e) => {
    const video = document.getElementById("covervid");
    console.log('TARGET?', e.currentTarget)
    console.log('PAUSED?', e.currentTarget.dataset.is_paused == "PAUSE")
    if (e.currentTarget.dataset.is_paused == "PAUSE") {
      console.log('PAUSED?')
      video.pause();
      e.currentTarget.dataset.is_paused = "PLAY";
      e.currentTarget.innerHTML =
        '<img style="opacity:0.5;cursor:pointer;" title="Play" src="https://cdn.glitch.global/9bf49f72-9680-44d0-9008-325c0f4b202a/play_but.png?v=1658624633107" />';
    } else {
      video.play();
      e.currentTarget.dataset.is_paused = "PAUSE";
      e.currentTarget.innerHTML =
        '<img style="opacity:0.5;cursor:pointer;" title="Pause" src="https://cdn.glitch.global/9bf49f72-9680-44d0-9008-325c0f4b202a/pause_but.png?v=1658624634526" />';
    }
  };

  return (
    <div className="app">
      <section className="hero-section">
        <a role="button" href="javascript:void(0);" onClick={()=>{document.getElementById('contact_section').scrollIntoView(true)}} style={{zIndex:"99999"}}>
          contact
        </a>
        <img
          className="hero_bg"
          id="bg_layer3"
          src="images/forest_back_97.png"
        />
        <img
          className="hero_bg"
          id="bg_layer2"
          src="images/forest_back_96.png"
        />
        <img
          className="hero_bg"
          id="bg_layer1"
          src="images/deerscape_95.png"
        />
        <img
          className="ets_logo"
          src="images/ets_logo.png"
          style={{objectFit:"cover"}}
        />
        <a id="hero_down" href="javascript:void(0);" onClick={()=>{document.getElementById('video-section').scrollIntoView(true)}}></a>
        <a href="javascript:void(0);" onClick={()=>{document.getElementById('video-section').scrollIntoView(true)}}>
          <img id="down_arrow" src="images/arrow_down.png" />
        </a>
      </section>

      <section className="video-section" id="video-section">
        <video id="covervid" muted loop>
          <source
            src="videos/treeserve_bg.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div id="overlay"></div>
        <div id="vid-blurb">
          <h3>Erickson Tree Service</h3>
          <p>
            The premier tree service company in South Dakota. 
            We offer a wide range of tree services, including tree removal, tree trimming, stump grinding, tree planting and much more. 
          </p>
          <p>Contact us today for an estimate.</p>
        </div>
        <span
          id="play_controls"
          data-is_paused="PAUSE"
          onClick={togglePause}
          >
            <img
              style={{opacity:"0.5",cursor:"pointer"}}
              title="Pause"
              src="images/pause_but.png"
              />
          </span>

        <div id="vid-contact">
          <a href="javascript:void(0);" onClick={()=>{document.getElementById('contact_section').scrollIntoView(true)}}>Contact Us Now</a>
        </div>
      </section>

      <section className="sticky-section" id="intro-section">
        <div id="open-blurb">
          <img
            src="images/isa-logo.png"
          />
          Erickson Tree Service has been servicing South Dakota for 10 years. We
          are a veteran-owned and operated business, and we take pride in our work.
          We are fully equipped, insured and bonded. Our
          staff of certified arborists have the knowledge and experience to
          properly care for your trees. We offer a wide range of services,
          including tree trimming, tree removal, stump removal, and professional
          ISA consulting.
        </div>

        <div style={{display:"inline-block",position:"relative",margin:"25px 0px"}}>
          <img
            src="images/sd_outline.png"
            width="200"
          />
          <img
            className="state-circle"
            src="images/tinytree.png"
            style={{position:"absolute"}}
          />
        </div>
        <div className="trim-blurb-caption">
          <h4>We provide our services all over South East South Dakotka</h4>
        </div>
      </section>
      
      <section className="sticky-section" id="removalsection">
          <div className="blurb" style={{zIndex:"2"}}>
            <h3>Tree Removal</h3>
            We love trees but there are many reasons why a tree may need to be cut down.
            The tree is dead or dying, interfering with infrastructure, structurally unsound, 
            or poses a safety hazard. In any case, the work needs to be done with specialized 
            equipment by trained professionals. We have the expirence and equipment to safely and efficiently 
            remove trees from your property.
          </div>
          <div className="scene">
            <div className="scene-images">
              <img
                id="sawguy-img"
                src="images/man_saw.png"
              />
              <img
                id="treetop-img"
                src="images/Tree_top.png"
              />
              <img
                id="treebottom-img"
                src="images/tree_root.png"
              />
            </div>
          </div>
      </section>
      
      <section className="presentation-section" id="removalsection2">
        <img style={{zIndex:"1",position:"absolute",top:"0",left:"0",transform:"translate(0, -99%)"}} src="images/forest_transition.png" />
        <div className="grid-container">
        <h2 className="presentation-title">On The Job</h2>
          <div className="grid-item span-6 span-12-small">
            <div className="scene">
              <div className="scene-images">
                <img
                  width="350"
                  id="treerem-img"
                  src="images/tree_rem.jpg"
                />
              </div>
            </div>
            <div className="blurb">
              <h5>Right Equipment</h5>
              Erickson tree service is your go-to arborist when you need tree removal services. We have the necessary equipment and experience to successfully remove trees while protecting the surrounding environment. Trust us to get the job done right!
            </div>
          </div>
          <div className="grid-item span-6 span-12-small">
            <div className="scene">
              <div className="scene-images">
                <img
                  width="350"
                  id="treeconq-img"
                  src="images/tree_conq.jpg"
                />
              </div>
            </div>
            <div className="blurb">
              <h5>Huge Jobs</h5>
              We are able to handle any tree removal job, no matter how big or small. We are experienced in working in tight spaces and near homes and businesses, we can safely remove trees near power lines or other hazards.
            </div>
          </div>
          <div className="emg_container grid-item span-12 span-12-small">
            <div className="scene">
              <div className="scene-images">
                <img
                  width="350"
                  id="treedamge-img"
                  src="images/storm_damage_tree.jpg"
                />
              </div>
            </div>
            <div className="blurb">
              <h5>Emergency Tree Removal</h5>
              We live in an area that is prone to severe weather, which can often lead to damage to trees. 
              This damage can in turn cause damage to property, structures, and power lines. 
              If you find yourself in need of expidient tree removal or professional assessment, 
              please don&apos;t hesitate to contact us. We&apos;re here to help!
            </div>
          </div>
        </div>
      </section>
      

      <section className="sticky-section" id="trim-section">
        <div className="blurb">
          <h3>Trimming</h3>
          Tree trimming is an important part of tree care. Trimming can help to
          improve the tree&apos;s appearance, remove dead or damaged branches, and
          promote new growth. It is important to trim trees regularly to keep them
          healthy and looking their best.
        </div>
        <div className="scene">
          <div className="scene-images">
            <img
              id="lifttruck-img"
              src="images/lif_truck.png"
            />
            <img
              id="liftbasket-img"
              src="images/lif_basket.png"
              style={{ top: "45.0513%", right: "48.%" }}
            />
            <img
              id="talltree-img"
              src="images/tall_tree.png"
            />
          </div>
        </div>
      </section>
      
      
      <section className="presentation-section" id="trim-section1">
        <img style={{zIndex:"1",position:"absolute",top:"0",left:"0",transform:"translate(0, -99%)"}} src="images/forest_transition.png" />
        <div className="grid-container">
        <h2 className="presentation-title">Love My Job</h2>
          <div className="grid-item span-6 span-12-small">
            <div className="scene">
              <div className="scene-images">
                <img
                  width="350"
                  id="snowtrim-img"
                  src="images/trim_snow.jpg"
                />
              </div>
            </div>
            <div className="blurb">
              <h5>Any Location or Condition</h5>
              Often times trimming is required to avoid damage to our homes. We can get your tree no matter the location.
              We are open year round, ready to serve our community.  No matter the time of year or weather conditions.
            </div>
          </div>
          <div className="grid-item span-6 span-12-small">
            <div className="scene">
              <div className="scene-images">
                <img
                  width="350"
                  id="plines-img"
                  src="images/p_lines.jpg"
                />
              </div>
            </div>
            <div className="blurb">
              <h5>Power Lines</h5>
              It is important to properly trim trees around power lines. This includes removing any branches that are close to the lines, as well as trimming back any branches that could potentially fall onto the lines. 
            </div>
          </div>
          <div className="emg_container grid-item span-12 span-12-small">
            <div className="scene">
              <div className="scene-images">
                <img
                  width="350"
                  id="arbview-img"
                  src="images/arborist_view.jpg"
                />
              </div>
            </div>
            <div className="blurb">
              <h5>Enjoy The View</h5>
              We often do our trimming high up off the gound and are afforded wonderful views of the surrounding area.
              We&apos;re proud to be the recipient of back-to-back &quot;best of Mitchell, SD&quot; business of the year awards. When you choose us, you can be confident that you&apos;re getting the best tree service in the area. Contact us today for a free consultation.
            </div>
          </div>
        </div>  
      </section>

      <section className="sticky-section" id="stump-section">
        <div className="blurb">
          <h3>Stump Removal</h3>
          When you have a tree stump in your yard, it can be an eyesore and make
          it difficult to mow the lawn. Tree stump removal is a simple process
          only with the right equipment. We have to knowlage and equipment to get rid of those stumps!
        </div>
        <div className="scene">
          <div className="scene-images" style={{minHeight:"250px"}}>
            <img
              id="stump-img"
              src="images/stump.png"
            />
            <img
              id="pulltruck-img"
              src="images/pull_truck.png"
            />
            <img
              id="hook-img"
              src="images/hook.png"
            />
          </div>
        </div>
      </section>
      
      <section className="presentation-section" id="stump-section1">
        <img style={{zIndex:"1",position:"absolute",top:"0",left:"0",transform:"translate(0, -99%)"}} src="images/forest_transition.png" />
        <div className="grid-container">
        <h2 className="presentation-title">Stumped</h2>
          <div className="grid-item span-6 span-12-small">
            <div className="scene">
              <div className="scene-images">
                <img
                  width="350"
                  id="stump1-img"
                  src="images/stump_saw.jpg"
                />
              </div>
            </div>
            <div className="blurb">
              <h5>Any Location or Condition</h5>
              Often times trimming is required to avoid damage to our homes. We can get your tree no matter the location.
              We are open year round, ready to serve our community.  No matter the time of year or weather conditions.
            </div>
          </div>
          <div className="grid-item span-6 span-12-small">
            <div className="scene">
              <div className="scene-images">
                <img
                  width="350"
                  id="stump2-img"
                  src="images/massive_stump.jpg"
                />
              </div>
            </div>
            <div className="blurb">
              <h5>Power Lines</h5>
              It is important to properly trim trees around power lines. This includes removing any branches that are close to the lines, as well as trimming back any branches that could potentially fall onto the lines. 
            </div>
          </div>
          <div className="emg_container grid-item span-12 span-12-small">
            <div className="scene">
              <div className="scene-images">
                <img
                  width="350"
                  id="stump3-img"
                  src="images/stump_grind.jpg"
                />
              </div>
            </div>
            <div className="blurb">
              <h5>Enjoy The View</h5>
              We often do our trimming high up off the gound and are afforded wonderful views of the surrounding area.
              We&apos;re proud to be the recipient of back-to-back &quot;best of Mitchell, SD&quot; business of the year awards. When you choose us, you can be confident that you&apos;re getting the best tree service in the area. Contact us today for a free consultation.
            </div>
          </div>
        </div>  
      </section>
      
      <section className="sticky-section" id="arborist-section">
        <div className="blurb">
          <h3>Safety</h3>
          It is important to properly trim trees around power lines. This includes
          removing any branches that are close to the lines, as well as trimming
          back any branches that could potentially fall onto the lines.
        </div>
        <div className="tree-sur">
          <div className="tree-zoom">
            <img
              id="tree-img"
              src="images/tree-silhouette-green.png"
            />
            <div className="tree-zoom-mag">
              <div className="tree-zoom-mag-inner"></div>
              <img
                id="mag-img"
                src="images/magnifying-glass-icon-transparent-4.png"
              />
            </div>
          </div>
          <div id="arb_blurb">
            <h4>An <u>arborist</u> is also known as a &quot;tree surgeon&quot;</h4>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact_section">
        <img style={{zIndex:"1",position:"absolute",top:"0",left:"0",transform:"translate(0, -99%)"}} src="images/forest_transition.png" />
        <div className="contact-container" style={{display:'grid', maxWidth:"1200px", gridTemplateColumns: "repeat(12, 1fr)"}}>
          <h2 className="presentation-title">Contact Us</h2>
          <div className="contact-info span-12-small">
            <p>
              Need an esitmate? Questions? Comments?<br /> 
              We would love to hear from you. <br />
              Contact us via mail, email, phone or this contact form. <br />
              Check us out on facebook! <br />
              
            </p>
            <div style={{display:'flex', gap:'25px', fontSize:'.8rem', margin:"auto"}}>
              <div className="company-address">
                Erickson Tree Service<br />
                PO Box 1282<br />
                Mitchell, SD 57301
              </div>
              <div className="company-phone">
                <a href="tel:6057701376">(605)-770-1376</a>
                <a href="mailto:ericksontreeservice@gmail.com">Email</a>
                <a href="https://www.facebook.com/Ericksontrees">Facebook</a>
              </div>
            </div>
          </div>
          <div className="contact-form span-12-small" style={{gridColumn:'span 6'}}>
          <ContactForm />
          </div>
        </div>
       
      </section>

      <footer>
        Erickson Tree Service <span className="footer-date"></span>©
      </footer>
    </div>
  )
}
