import Footer from "@/components/home/Footer";
//
// export default async function Home() {
//
//     const auth = await getAuthedUsername();
//
//     return (
//         <div className="flex min-h-screen w-full flex-col">
//             <Header auth={auth}/>
//             <main className="flex-1">
//             </main>
//
//             <Footer/>
//         </div>
//     )
// }

import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {

    return (
        <div className="flex min-h-screen w-full flex-col bg-gradient-to-br">
            {/*<Header />*/}
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-primary mb-4">Welcome to Smart Pay</h1>
                    <p className="text-xl text-gray-600">Secure your digital identity with blockchain technology</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image
                            src="/logo.png"
                            alt="Logo or hero image"
                            width={500}
                            height={500}
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-3xl font-semibold text-foreground">Take control of your digital
                            identity</h2>
                        <p className="text-gray-600">
                            web3id empowers you to manage your online presence securely and efficiently using
                            cutting-edge blockchain technology.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Decentralized identity verification</li>
                            <li>Enhanced privacy and security</li>
                            <li>Seamless integration with Web3 applications</li>
                            <li>Full control over your personal data</li>
                        </ul>
                        <div className="pt-4">
                            <Link href="/get-started"
                                  className="bg-foreground text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <h2 className="text-3xl font-semibold text-center text-foreground mb-8">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {['Create', 'Verify', 'Use'].map((step, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="text-4xl font-bold text-primary mb-4">{index + 1}</div>
                                <h3 className="text-xl font-semibold mb-2">{step} Your Identity</h3>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}