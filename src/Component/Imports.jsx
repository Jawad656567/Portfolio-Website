import ProfileHeader from "./ProfileHeader";
import About from "./About";
import Skill from "./Skill";
import Project from "./Project";
import Contact from "./Contact";


export default function Imports() {
    return (
        <>
            <section id='home'>
                <ProfileHeader />
            </section>

            <section id="about">
                <About />
            </section>

            <section id="skills" className="h-screen flex items-center justify-center bg-purple-100">
                <Skill />
            </section>

            <section id="projects">
                <Project />
            </section>

            <section id="contact" className="h-screen flex items-center justify-center bg-red-100">
                <Contact />
            </section>
        </>

    )
}
