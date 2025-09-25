import Gallery from "./components/Gallery";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-cream to-background">
        <div className="text-center px-6 w-full max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl ring-4 ring-autumn-orange/30">
              <Image
                src="/jamieson.jpg"
                alt="Jamieson"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-autumn-red mb-4">
                Pumpkins By Jamie
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80">
                Elegant porch displays for the autumn season
              </p>
            </div>
          </div>
          <a
            href="#packages"
            className="inline-block bg-autumn-orange text-white px-8 py-4 rounded-lg text-lg hover:bg-autumn-red transition-colors duration-300 mt-4"
          >
            View Our Packages
          </a>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-serif text-center text-autumn-red mb-16">
            Gallery
          </h2>
          <Gallery />
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-20 px-6 bg-cream/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-serif text-center text-autumn-red mb-16">
            Our Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { name: "Package #1", price: "$1500", features: ["2 Grand Prize Pumpkins", "10 Large Jack O'Lanterns", "8 Medium Jack O'Lanterns", "8 White Ghost Pumpkins", "Assortment of Pie Pumpkins", "16 Specialty Pumpkins", "Mini Orange Pumpkins", "Mini White Pumpkins", "3 Hay Bales", "Ornamental Gourds", "Design and Setup Included"] },
              { name: "Package #2", price: "$850", features: ["8 Large Jack O'Lanterns", "8 Medium Jack O'Lanterns", "8 White Ghost Pumpkins", "Assortment of Pie Pumpkins", "14 Specialty Pumpkins", "2 Hay Bales", "Ornamental Gourds", "Design and Setup Included"] },
              { name: "Package #3 (DIY)", price: "$550", features: ["6 Large Jack O'Lanterns", "6 Medium Jack O'Lanterns", "6 White Ghost Pumpkins", "Assortment of Pie Pumpkins", "8 Specialty Pumpkins", "2 Hay Bales", "Front Porch Drop Off", "Add Design & Setup for +$75"] },
              { name: "Package #4 (DIY)", price: "$350", features: ["4 Large Jack O'Lanterns", "4 Medium Jack O'Lanterns", "4 White Ghost Pumpkins", "Assortment of Pie Pumpkins", "6 Specialty Pumpkins", "Front Porch Drop Off", "Add Design & Setup for +$75"] },
              { name: "Custom Package", price: "Contact Us", features: ["Choose Your Own Pumpkins", "Select Quantity & Types", "Add Specialty Items", "Include Hay Bales", "Add Corn Stalks", "Choose Gourds & Decorations", "Design Service Available", "Tailored to Your Budget", "Perfect for Any Display Size"], custom: true },
            ].map((pkg, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-serif text-autumn-red mb-2">{pkg.name}</h3>
                <p className={`text-4xl font-bold ${pkg.custom ? 'text-autumn-red' : 'text-autumn-orange'} mb-6`}>{pkg.price}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="text-foreground/80 flex items-start">
                      <span className="text-autumn-gold mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="block text-center bg-autumn-orange text-white px-4 py-2 rounded hover:bg-autumn-red transition-colors duration-300"
                >
                  Book Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-autumn-red text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-serif mb-8">Book Your Display</h2>
          <p className="text-xl mb-8">
            Pumpkins Worth Falling For
          </p>
          <a
            href="mailto:jamie@pumpkinsbyjamie.com"
            className="inline-block bg-white text-autumn-red px-8 py-4 rounded-lg text-lg font-semibold hover:bg-cream transition-colors duration-300"
          >
            Email Us: jamie@pumpkinsbyjamie.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-foreground/60 border-t border-autumn-orange/20">
        <p>&copy; 2024 Pumpkins By Jamie. All rights reserved.</p>
      </footer>
    </div>
  );
}