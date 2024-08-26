import React, { useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Switcher from '../components/switcher';
import { Link } from 'react-router-dom';
import {MdOutlineArrowForward} from "../assets/icons/vander"

export default function Terms() {
    const accordionData = [
        {
            title: '1. Legally Binding Agreement',
            content: 'These terms constitute a contract between you and MetaQueer Inc.'
        },
        {
            title: '2. User Responsibilities',
            content: '- There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.',
            extra: '- You are responsible for maintaining the security of your account and wallet.'
        },
        {
            title: '3. Content Ownership',
            content: '- You retain ownership of your content.',
            extra: '- MetaQueer owns all MetaQueer Content.'
        },
        {
            title: '4. Digital Collectibles',
            content: "- You own the Digital Collectibles you create, subject to MetaQueer's rights.",
            extra: '- Usage is governed by Smart Contracts and our Digital Collectible License.'
        },
        {
            title: '5. Royalties',
            content: '- Creators can set royalties up to 50% for secondary sales.',
            extra: "- MetaQueer takes a 20% cut of the creator's royalty."
        },
        {
            title: '6. Prohibited Content',
            content: ' No explicit sexual content, hate speech, exploitation of minors, extreme violence, or fraudulent schemes.',
        },
        {
            title: '7. Copyright',
            content: "- You must respect others' intellectual property rights.",
            extra: '- MetaQueer reserves the right to remove content alleged to be infringing.',
            extra1: "- Repeat infringers' accounts may be terminated.",
            extra2: '- Report copyright infringement to admin@metaqueer.space.'
            
        },
        {
            title: '8. Blockchain and NFT Risks',
            content: "You accept risks associated with blockchain technology and NFTs."
        },
        {
            title: '9. Liability',
            content: "- MetaQueer's liability is limited to $100.",
            extra: "- We're not responsible for losses due to blockchain issues or wallet security."
        },
        {
            title: '10. Dispute Resolution',
            content: "- Disputes are settled through arbitration in New York City.",
            extra: ' - You can opt-out of arbitration within 30 days of accepting these terms.',
        },
        {
            title: '11. Termination',
            content: "MetaQueer can suspend or terminate your account at any time.",
        },
        {
            title: '12. Changes to Terms',
            content: "We may amend these terms at any time. Continued use constitutes acceptance."
        },
    ]
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(0);
        } else {
            setActiveIndex(index);
        }
    }
    return (
        <>
            <Navbar />

            <section className="relative table w-full py-36 bg-[url('../../assets/images/bg/bg1.jpg')] bg-bottom bg-no-repeat">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900"></div>
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Terms & Conditions</h3>

                    </div>
                </div>

                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Terms</li>
                    </ul>
                </div>
            </section>
            <div className="relative">
                <div className="shape absolute start-0 end-0 sm:-bottom-px -bottom-[2px] overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative md:py-24 py-16">
                <div className="container">
                    <div className="md:flex justify-center">
                        <div className="md:w-3/4">
                            <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-800 rounded-md">
                                <h5 className="text-xl font-semibold mb-4">Introduction :</h5>
                                <p className="text-slate-400">MetaQueer.Space is a digital platform for the queer community, focusing on creating, collecting, and connecting. By using our services, you agree to these terms.</p>

                                {/* <h5 className="text-xl font-semibold mb-4 mt-8">User Agreements :</h5>
                                <p className="text-slate-400">The most well-known dummy text is the 'Lorem Ipsum', which is said to have <b className="text-red-600">originated</b> in the 16th century. Lorem Ipsum is <b className="text-red-600">composed</b> in a pseudo-Latin language which more or less <b className="text-red-600">corresponds</b> to 'proper' Latin. It contains a series of real Latin words. This ancient dummy text is also <b className="text-red-600">incomprehensible</b>, but it imitates the rhythm of most European languages in Latin script. The <b className="text-red-600">advantage</b> of its Latin origin and the relative <b className="text-red-600">meaninglessness</b> of Lorum Ipsum is that the text does not attract attention to itself or distract the viewer's <b className="text-red-600">attention</b> from the layout.</p>
                                <p className="text-slate-400 mt-3">There is now an <b className="text-red-600">abundance</b> of readable dummy texts. These are usually used when a text is <b className="text-red-600">required purely</b> to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or <b className="text-red-600">nonsensical</b> stories.</p>
                                <p className="text-slate-400 mt-3">It seems that only <b className="text-red-600">fragments</b> of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p> */}

                                {/* <h5 className="text-xl font-semibold mb-4 mt-8">Key Points :</h5>
                                {/* <p className="text-slate-400">You are specifically restricted from all of the following :</p> 
                                <ul className="list-none text-slate-400 mt-3">
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/>Legally Binding Agreement</li>
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/>Our Talented & Experienced Marketing Agency</li>
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/>Create your own skin to match your brand</li>
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/>Digital Marketing Solutions for Tomorrow</li>
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/>Our Talented & Experienced Marketing Agency</li>
                                    <li className="flex items-center mt-2"><MdOutlineArrowForward className="text-violet-600 text-base align-middle me-2"/>Create your own skin to match your brand</li>
                                </ul> */}

                                <h5 className="text-xl font-semibold mt-8">Key Points :</h5>

                                <div id="accordion-collapse" data-accordion="collapse" className="mt-6">
                                    {accordionData.map((item, index) => (
                                        <div key={index} className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4">
                                            <h2 className="text-base font-semibold" id="accordion-collapse-heading-1">
                                                <button onClick={() => toggleAccordion(index)} type="button"
                                                    className={`flex justify-between items-center p-5 w-full font-semibold text-start ${activeIndex === index ? 'bg-gray-50 dark:bg-slate-800 text-violet-600' : ''}`}
                                                    data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                                    <span>{item.title}</span>
                                                 
                                                    <svg data-accordion-icon className="w-4 h-4 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                    </svg>
                                                </button>
                                            </h2>
                                            {activeIndex === index && (
                                                <div id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
                                                    <div className="p-5">
                                                        <p className="text-slate-400 dark:text-gray-400">{item.content}</p>
                                                        <p className="text-slate-400 dark:text-gray-400">{item?.extra}</p>
                                                        <p className="text-slate-400 dark:text-gray-400">{item?.extra1}</p>
                                                        <p className="text-slate-400 dark:text-gray-400">{item?.extra2}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-6">
                                    <Link to="/" className="btn bg-violet-600 hover:bg-violet-700 border-violet-600 hover:border-violet-700 text-white rounded-full">Accept</Link>
                                    <Link to="/" className="btn bg-transparent hover:bg-violet-600 border-violet-600 text-violet-600 hover:text-white rounded-full ms-2">Decline</Link>
                                </div>
                                <p className="text-slate-400 mt-3">For the full terms or any questions, please contact admin@metaqueer.space.</p> 
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    )
}
