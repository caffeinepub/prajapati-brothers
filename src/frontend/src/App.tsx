import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  Clock,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  ShoppingCart,
  Trash2,
  Twitter,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MENU_DATA: MenuItem[] = [
  {
    id: "veg-steamed",
    name: "Veg Steamed Momos",
    price: 80,
    description:
      "Soft steamed dumplings with fresh vegetable filling, served with our signature spicy red chutney.",
    image: "/assets/generated/veg-steamed-momos.dim_400x300.jpg",
    category: "SIGNATURE MOMOS",
  },
  {
    id: "veg-fried",
    name: "Veg Fried Momos",
    price: 90,
    description:
      "Golden crispy fried momos with crunchy exterior and juicy vegetable filling inside.",
    image: "/assets/generated/veg-fried-momos.dim_400x300.jpg",
    category: "SIGNATURE MOMOS",
  },
  {
    id: "paneer-momos",
    name: "Paneer Momos",
    price: 100,
    description:
      "Premium momos stuffed with seasoned cottage cheese, a must-try for paneer lovers.",
    image: "/assets/generated/paneer-momos.dim_400x300.jpg",
    category: "SIGNATURE MOMOS",
  },
  {
    id: "corn-momos",
    name: "Corn Momos",
    price: 95,
    description:
      "Sweet corn and cheese filled momos with a delightful crunch in every bite.",
    image: "/assets/generated/corn-momos.dim_400x300.jpg",
    category: "SIGNATURE MOMOS",
  },
  {
    id: "soya-chaap",
    name: "Soya Chaap",
    price: 120,
    description:
      "Classic soya chaap in rich, aromatic curry sauce. The ultimate Delhi street food experience.",
    image: "/assets/generated/soya-chaap.dim_400x300.jpg",
    category: "DELICIOUS CHAAP",
  },
  {
    id: "malai-chaap",
    name: "Malai Chaap",
    price: 140,
    description:
      "Tender soya sticks in velvety malai gravy, a creamy indulgent treat.",
    image: "/assets/generated/malai-chaap.dim_400x300.jpg",
    category: "DELICIOUS CHAAP",
  },
  {
    id: "tandoori-chaap",
    name: "Tandoori Chaap",
    price: 150,
    description:
      "Marinated soya chaap grilled to perfection in our clay tandoor with signature spices.",
    image: "/assets/generated/tandoori-chaap.dim_400x300.jpg",
    category: "DELICIOUS CHAAP",
  },
  {
    id: "afghani-chaap",
    name: "Afghani Chaap",
    price: 160,
    description:
      "Aromatic Afghani-style preparation with cream, cashew, and exotic spices. Rich and indulgent.",
    image: "/assets/generated/afghani-chaap.dim_400x300.jpg",
    category: "DELICIOUS CHAAP",
  },
  {
    id: "cold-drink",
    name: "Cold Drink",
    price: 30,
    description:
      "Chilled refreshing soft drink to complement your meal perfectly.",
    image: "/assets/generated/masala-fries.dim_400x300.jpg",
    category: "SIDES & DRINKS",
  },
  {
    id: "mineral-water",
    name: "Mineral Water",
    price: 20,
    description:
      "Pure chilled mineral water, because good food deserves good hydration.",
    image: "/assets/generated/masala-fries.dim_400x300.jpg",
    category: "SIDES & DRINKS",
  },
  {
    id: "masala-fries",
    name: "Masala Fries",
    price: 60,
    description:
      "Crispy golden fries tossed in our secret blend of Indian spices and chaat masala.",
    image: "/assets/generated/masala-fries.dim_400x300.jpg",
    category: "SIDES & DRINKS",
  },
];

const CATEGORIES = ["SIGNATURE MOMOS", "DELICIOUS CHAAP", "SIDES & DRINKS"];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>("home");

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(item: MenuItem) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} added to cart!`, { duration: 1500 });
  }

  function updateQuantity(id: string, delta: number) {
    setCart((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, quantity: c.quantity + delta } : c,
      );
      return updated.filter((c) => c.quantity > 0);
    });
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }

  function placeOrder() {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setCart([]);
    toast.success("🎉 Order placed successfully! Preparing your food...", {
      duration: 4000,
      description: "Thank you for ordering from Prajapati Brothers!",
    });
  }

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col font-body">
      <Toaster position="top-right" richColors />

      {/* NAVBAR */}
      <header
        className="sticky top-0 z-50 bg-header border-b border-border shadow-xs"
        data-ocid="nav.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🥟</span>
            <div>
              <span className="font-condensed font-bold text-lg sm:text-xl tracking-widest text-foreground uppercase leading-none">
                Prajapati Brothers
              </span>
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase">
                Momos & Chaap
              </p>
            </div>
          </div>
          <nav
            className="hidden md:flex items-center gap-6"
            data-ocid="nav.link"
          >
            {["home", "menu", "our-story", "contact"].map((link) => (
              <button
                type="button"
                key={link}
                onClick={() => scrollToSection(link)}
                className={`text-xs font-semibold uppercase tracking-widest transition-colors hover:text-primary ${
                  activeSection === link
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                data-ocid={`nav.${link}.link`}
              >
                {link === "our-story" ? "OUR STORY" : link.toUpperCase()}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => scrollToSection("order")}
            className="relative flex items-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded font-semibold text-sm hover:opacity-90 transition-opacity"
            data-ocid="cart.button"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-foreground text-background text-[10px] px-1.5 py-0.5 min-w-[20px] text-center">
                {cartCount}
              </Badge>
            )}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative h-[520px] sm:h-[600px] flex items-center justify-center overflow-hidden"
        data-ocid="hero.section"
      >
        <img
          src="/assets/generated/hero-street-food.dim_1400x600.jpg"
          alt="Indian street food"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.3em] mb-3">
            Est. 2010 · Delhi, India
          </p>
          <h1 className="font-condensed font-bold text-5xl sm:text-7xl text-white uppercase tracking-tight leading-none drop-shadow-2xl mb-4">
            TASTE THE
            <br />
            <span className="text-primary">STREETS</span> OF INDIA
          </h1>
          <p className="text-white/85 text-lg sm:text-xl max-w-xl mx-auto mb-8">
            Authentic handcrafted momos & sizzling chaap — straight from the
            heart of Old Delhi
          </p>
          <Button
            onClick={() => scrollToSection("menu")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-condensed font-bold text-lg uppercase tracking-widest px-8 py-3 h-auto rounded"
            data-ocid="hero.primary_button"
          >
            ORDER NOW
          </Button>
        </motion.div>
      </section>

      {/* MAIN CONTENT */}
      <main
        id="menu"
        className="pattern-bg flex-1 py-10"
        data-ocid="menu.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT: Menu */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8 text-center lg:text-left"
              >
                <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-1">
                  Our Menu
                </p>
                <h2 className="font-condensed font-bold text-4xl sm:text-5xl uppercase tracking-tight text-foreground">
                  WHAT WE SERVE
                </h2>
                <Separator className="mt-4 bg-border" />
              </motion.div>

              {CATEGORIES.map((category, catIdx) => {
                const items = MENU_DATA.filter((m) => m.category === category);
                const categoryEmoji =
                  category === "SIGNATURE MOMOS"
                    ? "🥟"
                    : category === "DELICIOUS CHAAP"
                      ? "🍢"
                      : "🍟";
                return (
                  <motion.div
                    key={category}
                    className="mb-10"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-2xl">{categoryEmoji}</span>
                      <h3 className="font-condensed font-bold text-2xl sm:text-3xl uppercase tracking-widest text-foreground">
                        {category}
                      </h3>
                      <div className="flex-1 h-px bg-border ml-2" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {items.map((item, idx) => (
                        <motion.div
                          key={item.id}
                          className="bg-card rounded shadow-card border border-border overflow-hidden flex flex-col"
                          initial={{ opacity: 0, scale: 0.97 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.07 }}
                          data-ocid={`menu.item.${catIdx * 4 + idx + 1}`}
                        >
                          <div className="h-44 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-semibold text-sm text-foreground leading-snug">
                                {item.name}
                              </h4>
                              <span className="text-primary font-bold font-condensed text-lg shrink-0">
                                ₹{item.price}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3">
                              {item.description}
                            </p>
                            <Button
                              onClick={() => addToCart(item)}
                              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-condensed font-bold uppercase tracking-widest text-xs h-9 rounded"
                              data-ocid={`menu.item.${catIdx * 4 + idx + 1}.button`}
                            >
                              ADD TO CART
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* RIGHT: Order Sidebar */}
            <div id="order" className="w-full lg:w-80 xl:w-96 shrink-0">
              <div className="sticky top-20">
                <motion.div
                  className="bg-card border border-border rounded shadow-card overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  data-ocid="order.panel"
                >
                  <div className="bg-primary px-5 py-4">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-primary-foreground" />
                      <h3 className="font-condensed font-bold text-xl uppercase tracking-widest text-primary-foreground">
                        YOUR ORDER SUMMARY
                      </h3>
                    </div>
                    {cartCount > 0 && (
                      <p className="text-primary-foreground/80 text-xs mt-1">
                        {cartCount} item{cartCount > 1 ? "s" : ""} in cart
                      </p>
                    )}
                  </div>

                  <div className="p-5">
                    <AnimatePresence mode="popLayout">
                      {cart.length === 0 ? (
                        <motion.div
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center py-10"
                          data-ocid="order.empty_state"
                        >
                          <span className="text-5xl block mb-3">🛒</span>
                          <p className="text-muted-foreground text-sm">
                            Your cart is empty
                          </p>
                          <p className="text-muted-foreground text-xs mt-1">
                            Add items from the menu!
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="items"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                            <AnimatePresence>
                              {cart.map((item, idx) => (
                                <motion.div
                                  key={item.id}
                                  layout
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="flex items-center gap-3 bg-secondary/40 rounded p-2"
                                  data-ocid={`order.item.${idx + 1}`}
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-foreground truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      ₹{item.price} each
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        updateQuantity(item.id, -1)
                                      }
                                      className="w-6 h-6 rounded border border-border bg-background flex items-center justify-center hover:bg-secondary transition-colors"
                                      data-ocid={`order.item.${idx + 1}.toggle`}
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-xs font-bold w-5 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => updateQuantity(item.id, 1)}
                                      className="w-6 h-6 rounded border border-border bg-background flex items-center justify-center hover:bg-secondary transition-colors"
                                      data-ocid={`order.item.${idx + 1}.toggle`}
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <div className="text-right min-w-[40px]">
                                    <p className="text-xs font-bold text-primary">
                                      ₹{item.price * item.quantity}
                                    </p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                    data-ocid={`order.item.${idx + 1}.delete_button`}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </motion.div>
                              ))}
                            </AnimatePresence>
                          </div>

                          <Separator className="my-4 bg-border" />

                          <div className="space-y-2 mb-5">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Subtotal
                              </span>
                              <span className="font-semibold">
                                ₹{cartTotal}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                Packaging
                              </span>
                              <span className="font-semibold">₹10</span>
                            </div>
                            <Separator className="bg-border" />
                            <div className="flex justify-between font-bold text-base">
                              <span>TOTAL</span>
                              <span className="text-primary">
                                ₹{cartTotal + 10}
                              </span>
                            </div>
                          </div>

                          <Button
                            onClick={placeOrder}
                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-condensed font-bold text-base uppercase tracking-widest h-11 rounded"
                            data-ocid="order.submit_button"
                          >
                            PLACE ORDER
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <div className="mt-4 bg-card border border-border rounded p-4 text-xs text-muted-foreground space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>Ready in 15–20 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>+91 76694 86725</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* OUR STORY */}
      <section
        id="our-story"
        className="bg-card border-t border-border py-16"
        data-ocid="story.section"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">
              Our Story
            </p>
            <h2 className="font-condensed font-bold text-4xl sm:text-5xl uppercase tracking-tight text-foreground mb-6">
              FROM DELHI'S STREETS
              <br />
              TO YOUR HEART
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto mb-4">
              Founded in 2010, Prajapati Brothers started as a humble stall in
              Old Delhi's bustling lanes. Our passion for authentic flavors and
              secret family recipes turned us into one of Delhi's most beloved
              street food destinations.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
              Every momo is hand-folded, every chaap is marinated overnight. We
              serve not just food — we serve memories, warmth, and the true
              spirit of Indian street cuisine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="pattern-bg border-t border-border py-16"
        data-ocid="contact.section"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-2">
              Contact
            </p>
            <h2 className="font-condensed font-bold text-4xl uppercase tracking-tight text-foreground">
              FIND US
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <MapPin className="w-6 h-6 text-primary" />,
                title: "LOCATION",
                lines: ["5 Block, Trilok Puri", "Near Miraj Cinema, Delhi"],
              },
              {
                icon: <Phone className="w-6 h-6 text-primary" />,
                title: "CALL US",
                lines: ["+91 76694 86725", "+91 84473 98069"],
              },
              {
                icon: <Clock className="w-6 h-6 text-primary" />,
                title: "HOURS",
                lines: ["Mon – Sun", "11:00 AM – 11:00 PM"],
              },
              {
                icon: <MessageCircle className="w-6 h-6 text-primary" />,
                title: "WHATSAPP",
                lines: ["+91 84473 98060", "Chat with us!"],
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                className="bg-card border border-border rounded p-6 text-center shadow-card"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="flex justify-center mb-3">{card.icon}</div>
                <h4 className="font-condensed font-bold text-sm uppercase tracking-widest text-foreground mb-2">
                  {card.title}
                </h4>
                {card.lines.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">
                    {line}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-footer text-footer" data-ocid="footer.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🥟</span>
                <span className="font-condensed font-bold text-xl tracking-widest uppercase">
                  Prajapati Brothers
                </span>
              </div>
              <p className="text-sm opacity-70 leading-relaxed">
                Authentic momos & chaap from the streets of Old Delhi. Made with
                love since 2010.
              </p>
            </div>
            <div className="sm:text-center">
              <p className="font-condensed font-bold text-sm uppercase tracking-widest mb-4 opacity-80">
                FOLLOW US
              </p>
              <div className="flex gap-3 sm:justify-center">
                {[
                  {
                    icon: <Instagram className="w-5 h-5" />,
                    label: "Instagram",
                  },
                  { icon: <Facebook className="w-5 h-5" />, label: "Facebook" },
                  { icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
                ].map((s) => (
                  <button
                    type="button"
                    key={s.label}
                    aria-label={s.label}
                    className="w-9 h-9 rounded border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:text-right">
              <p className="font-condensed font-bold text-sm uppercase tracking-widest mb-3 opacity-80">
                OPEN DAILY
              </p>
              <p className="text-sm opacity-70">Monday – Sunday</p>
              <p className="text-sm opacity-70">11:00 AM – 11:00 PM</p>
              <p className="text-sm opacity-70 mt-2">+91 76694 86725</p>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-6 text-center">
            <p className="text-xs opacity-50">
              © {new Date().getFullYear()} Prajapati Brothers. All rights
              reserved. ·{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 underline"
              >
                Built with ❤️ using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
