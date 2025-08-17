import React from "react";

const testimonials = [
    {
        name: "Alice Johnson",
        role: "Member",
        image: "https://i.pravatar.cc/100?img=32",
        comment: "This forum is amazing! I found answers to all my questions quickly."
    },
    {
        name: "Bob Smith",
        role: "Member",
        image: "https://i.pravatar.cc/100?img=12",
        comment: "I love how interactive the posts are. Great experience!"
    },
    {
        name: "Cathy Lee",
        role: "Member",
        image: "https://i.pravatar.cc/100?img=45",
        comment: "Very user-friendly platform. Highly recommend to join!"
    },
];

const TestimonialSection = () => {
    return (
        <section className="bg-base-200 py-16 px-4 md:px-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl lg:text-4xl text-primary text-center font-bold my-6">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-20 h-20 rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                            <p className="text-gray-500 mb-2">{testimonial.role}</p>
                            <p className="text-gray-700">{testimonial.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
