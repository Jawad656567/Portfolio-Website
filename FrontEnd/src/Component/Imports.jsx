import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import About from "./About";
import Featured from "./Featured.jsx";
import Activities from "./Activities";
import Process from "./WorkProcess.jsx";
import Testomonials from "./Testomonial.jsx"
import Skill from './Skill.jsx';
import Education from "./Education.jsx";
import What from "./WhatDo.jsx";
import Experience from "./Experience.jsx";
import MainContact from "./MainContact.jsx";
import Footer from "./Footer.jsx";

export default function Imports() {
    return (
        <>
            <section id='home'>
                <ProfileHeader />
            </section>

            <section id="info">
                <ProfileInfo />
            </section>

            <section id="about">
                <About />
            </section>

            <section id="featured">
                <Featured />
            </section>

            <section id="activities">
                <Activities />
            </section>

            <section id="education">
                <Education />
            </section>

            <section id="experience">
                <Experience />
            </section>

            <section id="whatdo">
                <What />
            </section>

            <section id="process">
                <Process />
            </section>

            <section id="test">
                <Testomonials />
            </section>

            <section id="skill">
                <Skill />
            </section>

            <section id="MainContact">
                <MainContact />
            </section>

            <section id="footer">
                <Footer />
            </section>

        </>

    )
}
