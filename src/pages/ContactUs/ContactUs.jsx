import React from "react";

const ContactUs = () => {
    return (
        <section className="bg-gray-100 py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-2xl lg:text-4xl text-primary text-center font-bold my-6">Contact Us</h2>
                <p className="text-gray-600 mb-12">
                    Have any questions or feedback? We'd love to hear from you!
                </p>

                <div className="grid md:grid-cols-2 items-stretch gap-8">
                    {/* Contact Info */}
                    <div className="flex flex-col space-y-4">
                        <div className="bg-white p-4 rounded-lg flex-1 flex flex-col justify-center">
                            <h3 className="text-xl font-semibold text-gray-700">Email</h3>
                            <p className="text-gray-600">support@talknest.com</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg flex-1 flex flex-col justify-center">
                            <h3 className="text-xl font-semibold text-gray-700">Phone</h3>
                            <p className="text-gray-600">+880 123 456 789</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg flex-1 flex flex-col justify-center">
                            <h3 className="text-xl font-semibold text-gray-700">Address</h3>
                            <p className="text-gray-600">123 Forum Street, Dhaka, Bangladesh</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-center">
                        <form className="space-y-4 h-full">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                placeholder="Your Message"
                                rows={8}
                                className="w-full border resize-none border-gray-300 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactUs;
