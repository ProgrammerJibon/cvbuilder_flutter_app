import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import parse from 'html-react-parser';
import { CgClose } from 'react-icons/cg';
import { BiDownload } from 'react-icons/bi';
import { FaFilePdf } from "react-icons/fa6";
import { Preview, print } from 'react-html2pdf';
import {Design1HTML} from "./CVCompileToHTML"



const ResumeBuilder = () => {
    const [name, setName] = useState('MD. JIBON HOWLADER');
    const [address, setAddress] = useState('Madhabpasha, Barisal');
    const [email, setEmail] = useState('admin@jibon.com.bd');
    const [link, setLink] = useState('https://www.freelancer.com/u/ProgrammerJibon');
    const [summary, setSummary] = useState('A motivated CSE student with expertise in software development, mobile apps, & full-stack web projects. Strong leadership in programming club roles, contests, and R&D initiatives. Proficient in Java, PHP, React Native, and passionate about impactful solutions like Saviour. Balances academics, freelancing & continuous learning.');
    const [skills, setSkills] = useState([{ sn: 'Java', pl: 'Professional' }]);
    const [experience, setExperience] = useState([{ c: 'Freelancer Inc.', p: 'Freelancer', sy: '2020', ey: '2024' }]);
    const [education, setEducation] = useState([{ d: 'BSc in CSE', i: 'Univeristy of Global Village', sy: '2022', ey: '2026' }]);
    const [certifications, setCertifications] = useState([{ t: 'Cert 1', a: 'Auth 1', y: '2022' }, { t: 'Cert 2', a: 'Auth 2', y: '2024' }]);
    const [involvement, setInvolvement] = useState([{ o: 'UGV Programming Club', r: 'Vice President', d: '2022-2024' }]);
    const [awards, setAwards] = useState([{ t: 'Awards 1', y: '2022', d: 'For Awersome Projects' }]);
    const [references, setReferences] = useState([{ n: 'Ref 1', p: 'Post 1', c: '0160003115' }]);
    const [selectedDesign, setSelectedDesign] = useState('design1');
    const [prevHTML, setPrevHTML] = useState("");


    const handleChange = (e, index, setter) => {
        const { name, value } = e.target;
        setter(prev => prev.map((item, i) => i === index ? { ...item, [name]: value } : item));
    };


    const addNewEntry = (setter, defaultValue) => {
        setter(prevState => [...prevState, defaultValue]);
    };

    const removeEntry = (setter, index) => {
        setter(prevState => prevState.filter((_, idx) => idx !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const resume = {
            name, address, email, link, summary, skills, experience, education, certifications, involvement, awards, references
        };
        if (selectedDesign == "design1") {
            setPrevHTML(Design1HTML(resume));
        } else {
            console.log("end design");
        }
    };




    return (
        <div className='bg-gray-100 p-8'>
            <div className="max-w-4xl mx-auto p-6 min-h-screen  bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Resume Builder Desktop App - Jibon</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Address:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Link:</label>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-lg font-semibold text-gray-700">Summary:</label>
                        <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Education:</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="mb-4 flex space-x-4">
                            <input
                                type="text"
                                name="d"
                                value={edu.d}
                                onChange={(e) => handleChange(e, index, setEducation)}
                                placeholder="Degree"
                                className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="i"
                                value={edu.i}
                                onChange={(e) => handleChange(e, index, setEducation)}
                                placeholder="Institution"
                                className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="sy"
                                value={edu.sy}
                                onChange={(e) => handleChange(e, index, setEducation)}
                                placeholder="Start Year"
                                className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="ey"
                                value={edu.ey}
                                onChange={(e) => handleChange(e, index, setEducation)}
                                placeholder="End Year"
                                className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeEntry(setEducation, index)}
                                className="text-red-500 hover:text-red-700 ml-2"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addNewEntry(setEducation, { d: '', i: '', sy: '', ey: '' })}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md mb-6 hover:bg-blue-600"
                    >
                        Add Education
                    </button>


                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skills:</h2>
                    {skills.map((skill, index) => (
                        <div key={index} className="mb-4 flex space-x-4">
                            <input
                                type="text"
                                name="sn"
                                value={skill.sn}
                                onChange={(e) => handleChange(e, index, setSkills)}
                                placeholder="Skill Name"
                                className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="pl"
                                value={skill.pl}
                                onChange={(e) => handleChange(e, index, setSkills)}
                                placeholder="Proficiency Level"
                                className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeEntry(setSkills, index)}
                                className="text-red-500 hover:text-red-700 ml-2"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addNewEntry(setSkills, { sn: '', pl: '' })}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md mb-6 hover:bg-blue-600"
                    >
                        Add Skill
                    </button>

                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Experience:</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="mb-4 flex space-x-4">
                            <input
                                type="text"
                                name="c"
                                value={exp.c}
                                onChange={(e) => handleChange(e, index, setExperience)}
                                placeholder="Company"
                                className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="p"
                                value={exp.p}
                                onChange={(e) => handleChange(e, index, setExperience)}
                                placeholder="Position"
                                className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="sy"
                                value={exp.sy}
                                onChange={(e) => handleChange(e, index, setExperience)}
                                placeholder="Start Year"
                                className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="ey"
                                value={exp.ey}
                                onChange={(e) => handleChange(e, index, setExperience)}
                                placeholder="End Year"
                                className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeEntry(setExperience, index)}
                                className="text-red-500 hover:text-red-700 ml-2"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addNewEntry(setExperience, { c: '', p: '', sy: '', ey: '' })}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md mb-6 hover:bg-blue-600"
                    >
                        Add Experience
                    </button>



                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Certifications:</h2>
                    {certifications.map((cert, index) => (
                        <div key={index} className="mb-4 flex space-x-4">
                            <input
                                type="text"
                                name="t"
                                value={cert.t}
                                onChange={(e) => handleChange(e, index, setCertifications)}
                                placeholder="Title"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="a"
                                value={cert.a}
                                onChange={(e) => handleChange(e, index, setCertifications)}
                                placeholder="Authority"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="y"
                                value={cert.y}
                                onChange={(e) => handleChange(e, index, setCertifications)}
                                placeholder="Year"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeEntry(setCertifications, index)}
                                className="text-red-500 hover:text-red-700 ml-2"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addNewEntry(setCertifications, { t: '', a: '', y: '' })}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md mb-6 hover:bg-blue-600"
                    >
                        Add Certification
                    </button>


                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Involvement:</h2>
                    {involvement.map((inv, index) => (
                        <div key={index} className="mb-4 flex space-x-4">
                            <input
                                type="text"
                                name="o"
                                value={inv.o}
                                onChange={(e) => handleChange(e, index, setInvolvement)}
                                placeholder="Organization"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="r"
                                value={inv.r}
                                onChange={(e) => handleChange(e, index, setInvolvement)}
                                placeholder="Role"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="d"
                                value={inv.d}
                                onChange={(e) => handleChange(e, index, setInvolvement)}
                                placeholder="Duration"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeEntry(setInvolvement, index)}
                                className="text-red-500 hover:text-red-700 ml-2"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addNewEntry(setInvolvement, { o: '', r: '', d: '' })}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md mb-6 hover:bg-blue-600"
                    >
                        Add Involvement
                    </button>




                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Awards:</h2>
                    {awards.map((award, index) => (
                        <div key={index} className="mb-4 flex space-x-4">
                            <input
                                type="text"
                                name="t"
                                value={award.t}
                                onChange={(e) => handleChange(e, index, setAwards)}
                                placeholder="Title"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="y"
                                value={award.y}
                                onChange={(e) => handleChange(e, index, setAwards)}
                                placeholder="Year"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="d"
                                value={award.d}
                                onChange={(e) => handleChange(e, index, setAwards)}
                                placeholder="Description"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeEntry(setAwards, index)}
                                className="text-red-500 hover:text-red-700 ml-2"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addNewEntry(setAwards, { t: '', y: '', d: '' })}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md mb-6 hover:bg-blue-600"
                    >
                        Add Award
                    </button>



                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">References:</h2>
                    {references.map((ref, index) => (
                        <div key={index} className="mb-4 flex space-x-4">
                            <input
                                type="text"
                                name="n"
                                value={ref.n}
                                onChange={(e) => handleChange(e, index, setReferences)}
                                placeholder="Name"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="p"
                                value={ref.p}
                                onChange={(e) => handleChange(e, index, setReferences)}
                                placeholder="Position"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="c"
                                value={ref.c}
                                onChange={(e) => handleChange(e, index, setReferences)}
                                placeholder="Contact"
                                className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeEntry(setReferences, index)}
                                className="text-red-500 hover:text-red-700 ml-2"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => addNewEntry(setReferences, { n: '', p: '', c: '' })}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md mb-6 hover:bg-blue-600"
                    >
                        Add Reference
                    </button>




                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Resume Design:</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <label key={num} className={`cursor-pointer border-4 rounded-md ${selectedDesign === `design${num}` ? 'border-blue-500' : 'border-transparent'} hover:border-blue-300 transition`}>
                                <input
                                    type="radio"
                                    name="resumeDesign"
                                    value={`design${num}`}
                                    checked={selectedDesign === `design${num}`}
                                    onChange={(e) => setSelectedDesign(e.target.value)}
                                    className="hidden"
                                />
                                <img
                                    src={`/designs/design${num}.jpg`}
                                    alt={`Design ${num}`}
                                    className="w-full h-32 object-cover rounded-md"
                                />
                            </label>
                        ))}
                    </div>





                    <button
                        type="submit"
                        className="px-6 my-6 hover:cursor-pointer py-3 text-white bg-blue-600 rounded-lg w-full hover:bg-blue-700"
                    >
                        Preview
                    </button>
                </form>
            </div>






            {/* resume preview */}
            {prevHTML != "" && <div className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 p-8 overflow-y-auto'>
                <div className='bg-white w-[8.27in] mx-auto rounded-sm overflow-hidden'>
                    <Preview id="prevHTML">
                        <div>{parse(prevHTML)}</div>
                    </Preview>
                </div>
                <div className='fixed right-16 top-16 '>
                    <div
                        onClick={() => {
                            setPrevHTML("");
                        }}
                        className='cursor-pointer font-bold text-3xl text-red-700 border border-red-300 rounded-full p-2 bg-green-100 hover:bg-red-200'>
                        <span>
                            <CgClose />
                        </span>
                    </div>
                    <div
                        onClick={()=>{
                            print(`Resume of  ${name} by Jibon Desktop Resume Builder ${selectedDesign}`, 'prevHTML')
                        }}
                        className='mt-3 cursor-pointer font-bold text-3xl text-green-700 border border-green-300 rounded-full p-2 bg-green-100 hover:bg-green-200'>
                        <span>
                            <FaFilePdf />
                        </span>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default ResumeBuilder;
