import React from 'react';

const ContactPage = () => {
    return (
        <div className="flex flex-col items-center py-10 px-5 lg:px-wrapper bg-white text-woody-wine">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-center mb-6">We'd love to hear from you! Reach out to us with any questions or inquiries.</p>
            <form className="w-full max-w-md mx-auto text-left">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-bold">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        className="w-full p-2 rounded border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-bold">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        className="w-full p-2 rounded border border-gray-300"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block mb-2 font-bold">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Your Message"
                        rows="5"
                        className="w-full p-2 rounded border border-gray-300"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="primary-button-dark"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactPage;
