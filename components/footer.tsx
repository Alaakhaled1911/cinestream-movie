import Link from "next/link"
import { Button } from "@/components/ui/button"

const footerLinks = {
  browse: [
    { href: "/movies", label: "Movies" },
    { href: "/series", label: "TV Shows" },
    { href: "/documentaries", label: "Documentaries" },
    { href: "/kids", label: "Kids" },
  ],
  support: [
    { href: "/help", label: "Help Center" },
    { href: "/contact", label: "Contact Us" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
}

const socialLinks = [
  { icon: "📘", label: "Facebook", href: "https://facebook.com" },
  { icon: "🐦", label: "Twitter", href: "https://twitter.com" },
  { icon: "📷", label: "Instagram", href: "https://instagram.com" },
]

const FooterSection = ({ 
  title, 
  children 
}: { 
  title: string
  children: React.ReactNode 
}) => (
  <div>
    <h4 className="font-semibold mb-4">{title}</h4>
    {children}
  </div>
)

const FooterLinkList = ({ links }: { links: typeof footerLinks.browse }) => (
  <ul className="space-y-2 text-muted-foreground">
    {links.map((link) => (
      <li key={link.href}>
        <Link 
          href={link.href} 
          className="hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
)

const SocialButtons = () => (
  <div className="flex gap-4">
    {socialLinks.map((social) => (
      <Button 
        key={social.label}
        variant="outline" 
        size="icon"
        asChild
      >
        <Link 
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
        >
          <span className="text-lg">{social.icon}</span>
        </Link>
      </Button>
    ))}
  </div>
)

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">🎬 CineStream</h3>
            <p className="text-muted-foreground">
              The premier movie streaming platform with the latest films and TV shows
            </p>
          </div>

          {/* Browse Section */}
          <FooterSection title="Browse">
            <FooterLinkList links={footerLinks.browse} />
          </FooterSection>

          {/* Support Section */}
          <FooterSection title="Support">
            <FooterLinkList links={footerLinks.support} />
          </FooterSection>

          {/* Social Section */}
          <FooterSection title="Follow Us">
            <SocialButtons />
          </FooterSection>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} CineStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}