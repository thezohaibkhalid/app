"use client";
import { motion } from "framer-motion";
import { Code, Palette, Search } from "lucide-react";

const services = [
    {
        icon: <Code size={32} />,
        title: "Web Development",
        description: "Building fast, responsive, and scalable websites using modern technologies like Next.js and React."
    },
    {
        icon: <Palette size={32} />,
        title: "UI/UX Design",
        description: "Creating intuitive and visually stunning interfaces that provide an exceptional user experience."
    },
    {
        icon: <Search size={32} />,
        title: "SEO Optimization",
        description: "Optimizing your digital presence to rank higher on search engines and reach your target audience."
    }
];

export default function ServicesSection() {
    return (
        <section className="py-20 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">What I Do</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border border-card-border p-8 rounded-2xl hover:border-primary transition-colors group"
                        >
                            <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-400">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
