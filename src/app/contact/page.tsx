import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Toolkio',
    description: 'Contact Toolkio. Send us feedback, report bugs, or make inquiries about our free online tools.',
};

export default function ContactPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                Contact Us
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
                Have feedback, found a bug, or want to suggest a new tool? Feel free to reach out.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
                    <div className="text-4xl mb-4">📧</div>
                    <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Email</h2>
                    <a href="mailto:contact@toolkio.com" className="text-emerald-600 hover:underline">
                        contact@toolkio.com
                    </a>
                    <p className="text-sm text-gray-500 mt-2">We typically respond within 1-2 business days.</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center">
                    <div className="text-4xl mb-4">📍</div>
                    <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Location</h2>
                    <p className="text-gray-600 dark:text-gray-300">Seoul, South Korea</p>
                </div>
            </div>
        </div>
    );
}
