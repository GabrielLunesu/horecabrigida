import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[var(--gray-light)] py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="slide-in-left" style={{ animationDelay: '0.1s' }}>
            <Image
              src="/horecabrigida-logo.png"
              alt="Horeca Brigida Logo"
              width={180}
              height={45}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-gray-600 mt-4">
              Specialist in tweedehands horeca apparatuur in Brunssum. Kwaliteit voor een betaalbare prijs.
            </p>
          </div>
          
          <div className="slide-in-left" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-lg font-semibold mb-4">Navigatie</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/catalog" className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                  Catalogus
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[var(--primary)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="slide-in-left" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <address className="not-italic">
              <p className="text-gray-600 mb-2">Brunssum, Nederland</p>
              <p className="text-gray-600 mb-2">
                <a href="tel:+31612345678" className="hover:text-[var(--primary)] transition-colors">
                  +31 6 12345678
                </a>
              </p>
              <p className="text-gray-600">
                <a href="mailto:info@horecabrigida.nl" className="hover:text-[var(--primary)] transition-colors">
                  info@horecabrigida.nl
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-600 fade-in" style={{ animationDelay: '0.4s' }}>
          <p>© {new Date().getFullYear()} Horeca Brigida. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
} 