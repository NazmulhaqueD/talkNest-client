import React, { useContext } from "react";
import { AuthContext } from "../../context/provider/AuthProvider";
import { toast } from "react-toastify";

const NewsletterSection = () => {


    const { user } = useContext(AuthContext);

    const handleSubscribe = (e) => {
        e.preventDefault();
        toast.success('Your are subscribed successfully')
    }

    return (
        <section className="bg-base-100 py-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl lg:text-4xl text-primary text-center font-bold my-6">
                    Subscribe to Our Newsletter
                </h2>
                <p className="text-secondary  mb-8">
                    Get the latest updates and posts delivered straight to your inbox.
                </p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        defaultValue={user?.email}
                        className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg focus:bg-secondary hover:bg-blue-700 transition-colors"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default NewsletterSection;
