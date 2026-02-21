import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import About from "./About";
import Activities from "./Activities";
import Skill from './Skill.jsx';
import Project from "./Project";
import Contact from "./Contact";
import Education from "./Education.jsx";
import Experience from "./Experience.jsx";

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

            <section id="Activities">
                <Activities />
            </section>

             <section id="education">
                <Education />
            </section>

             <section id="experience">
                <Experience/>
            </section>

            <section id="skill">
                <Skill />
            </section>

        </>

    )
}
