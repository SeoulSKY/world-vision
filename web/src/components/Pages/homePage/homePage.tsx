import React, {Component} from 'react';
import "../../../css/multiColumnTemplate.css"
import icon_education_white from "../../../images/icon-education-white-01.svg";
import icon_water from "../../../images/icon-water-white-01.svg"
import icon_food from "../../../images/icon-food-white-01.svg"
import icon_health from "../../../images/icon-health-white-01.svg"
import icon_childProtection from "../../../images/icon-childProtection-white-01.svg"
import icon_finance from "../../../images/icon-finance-white-01.svg"
import community_development from "../../../images/community-development-orange.svg"

class HomePage extends Component {
    render() {
        return (
            <div className="container">
                <section>
                    <h2 className="noDisplay">Main Content</h2>
                    <article>
                        <h1>About Us</h1>
                        <h2>Learn About Child Sponsorship</h2>
                        <p> Child sponsorship empowers children, their families and communities to help break the cycle
                            of poverty. When you sponsor a child, you provide access to basic necessities such as food,
                            clean water, education and health care. Child sponsorship is available to help children in
                            44 countries. </p>
                        <h2>How Sponsorship Works&nbsp;</h2>
                        <p> 1.&nbsp;We partner with community members to understand their needs, goals and resources,
                            and work together to find long-term solutions to the challenges they face.</p>
                        <p>2.&nbsp;&nbsp;We adapt plans as we begin to see change in children’s lives so that the
                            community continues to meet its goals. As more community members get involved, the community
                            takes increasing ownership of its success.</p>
                        <p>3.&nbsp;&nbsp;Thanks to support from donors like you, families enjoy better living conditions
                            and are empowered with knowledge and skills to create a brighter future for their
                            children.</p>
                    </article>
                </section>
                <div className="row">
                    <div className="columns">
                        <p className="thumbnail_align"><img src={icon_education_white} alt=""
                                                            className="thumbnail"/></p>
                        <h4>EDUCATION</h4>
                        <p>Access to education, classroom repairs, school supplies and training for teachers and parents
                            provide a child with opportunities for a better future.</p>
                    </div>
                    <div className="columns">
                        <p className="thumbnail_align"><img src={icon_water} alt=""
                                                            className="thumbnail"/></p>
                        <h4>SAFE WATER</h4>
                        <p>Access to safe water through well-drilling, pumps and training in hygiene and sanitation
                            decreases child mortality and frees up time for education instead of water collection.</p>
                    </div>
                    <div className="columns">
                        <p className="thumbnail_align"><img src={icon_food} alt=""
                                                            className="thumbnail"/></p>
                        <h4>NUTRITIOUS FOOD</h4>
                        <p>Going beyond food distribution to a focus on creating sustainable food supplies through
                            agricultural programs and nutritional training ensures that children are well-nourished and
                            healthy.</p>
                    </div>
                    <div className="columns">
                        <p className="thumbnail_align"><img src={icon_health} alt=""
                                                            className="thumbnail"/></p>
                        <h4>HEALTHCARE</h4>
                        <p>Good health is the foundation of a child’s life. Access to essential services, vaccinations,
                            medical clinics and training in disease prevention provide stronger health, for children and
                            their communities.</p>
                    </div>
                    <div className="columns">
                        <p className="thumbnail_align"><img src={icon_childProtection} alt=""
                                                            className="thumbnail"/></p>
                        <h4>CHILD PROTECTION</h4>
                        <p>We advocate for child rights and encourage children to speak up against abuse and injustice.
                            By educating families about child rights they are better equipped to keep their children
                            safe.</p>
                    </div>
                    <div className="columns">
                        <p className="thumbnail_align"><img src={icon_finance} alt=""
                                                            className="thumbnail"/></p>
                        <h4>ECONOMIC EMPOWERMENT</h4>
                        <p>Microloans, business training and a variety of trades and skills training enable families to
                            provide for their children’s needs, as well as helping them to build a better future.</p>
                    </div>
                    <div className="columns">
                        <p className="thumbnail_align"><img src={community_development} alt=""
                                                            className="thumbnail"/></p>
                        <h4>COMMUNITY LEADERSHIP</h4>
                        <p>We work with local leaders to strengthen their skills, build relationships, identify
                            community needs and solutions, and encourage networking with government groups.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;