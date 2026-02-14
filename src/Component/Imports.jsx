import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import About from "./About";
import Activities from "./Activities";
import Project from "./Project";
import Contact from "./Contact";


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

            <section id="projects">
                <Project />
            </section>

            <section id="contact" className="h-screen flex items-center justify-center bg-red-100">
                <Contact />
            </section>
        </>

    )
}
