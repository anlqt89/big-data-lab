import { Hero } from "../components/Hero";
import { HomeCard } from "../components/HomeCard";
import { features } from "../data/FeatureData";
import './home.css'
const Home = ()=>{
    return (
        <>
            <div className="container">
                <section className="app-container">
                     <label >Introduction</label>
                </section>
                <section className="app-container">
                    <Hero></Hero>
                </section>
                <section className="app-container">
                     <label>Features</label>
                </section>
                <section className="list-homecard">
                   {features.map((item) => (
                        <HomeCard key={item.id} title={item.title} tagline={item.tagline} description={item.description}></HomeCard>
                   ))}
                </section>
            </div>
        </>
    )
}

export default Home;