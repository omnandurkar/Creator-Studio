/**
 * Pastel Afterimage Archive visual reminder: Contact is the Closing-Credits
 * room—soft black, butter and coral, star fields, credit-roll typography, and a
 * pure-frontend collaboration form that guides Om to add real JSON contact links.
 */
import { ArrowLeft, ArrowUpRight, Mail, Music2, Send, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";
import { Link } from "wouter";
import SiteShell from "@/components/SiteShell";
import { contactDetails, studioProfile } from "@/lib/content";
import { toast } from "sonner";

const contactLinks = [
  { label: "Email", value: contactDetails.email, icon: Mail },
  { label: "Music profile", value: contactDetails.spotify, icon: Music2 },
  { label: "Instagram", value: contactDetails.instagram, icon: Sparkles },
];

export default function Contact() {
  const [message, setMessage] = useState("");
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contactDetails.email) {
      toast("The direct line is being kept private.", { description: "This correspondence room opens when Om files an email address here." });
      return;
    }
    window.location.href = `mailto:${contactDetails.email}?subject=${encodeURIComponent("A note for Om Nandurkar")}&body=${encodeURIComponent(message)}`;
  };

  return (
    <SiteShell pageTheme="contact">
      <section className="contact-hero"><div className="contact-hero__stars" aria-hidden="true" /><Link className="contact-hero__back" href="/"><ArrowLeft size={16} /> back to the studio</Link><div className="contact-hero__copy"><p className="contact-hero__kicker"><Sparkles size={14} /> closing credits / vol. 08</p><h1>Leave a<br /><em>good note.</em></h1><p>For music, writing, visual work, collaborations, invitations and all the interesting things that need a conversation first.</p></div><button aria-expanded={isCardOpen} aria-label="Reveal collaboration note" className={`contact-hero__card ${isCardOpen ? "is-open" : ""}`} onClick={() => setIsCardOpen((open) => !open)} type="button"><span className="contact-hero__stamp">✳</span><p>{isCardOpen ? "a small invitation" : "currently"}</p><strong>{isCardOpen ? "Bring the idea before it is finished." : contactDetails.availability}</strong><i /><small>Om Nandurkar<br />Creator Studio</small></button><div className="contact-hero__credit">a living archive<br />by Om Nandurkar</div></section>

      <section className="contact-details"><div className="contact-details__intro"><p className="section-kicker"><Mail size={14} /> direct lines</p><h2>Ways into<br />the <em>room.</em></h2><p>A few direct lines will live here when the time is right. Until then, this page keeps the lights on for collaborations that begin with a good note.</p></div><div className="contact-details__links">{contactLinks.map(({ label, value, icon: Icon }) => value ? <a href={value} key={label} rel="noreferrer" target={value.startsWith("http") ? "_blank" : undefined}><Icon size={18} /><span>{label}</span><ArrowUpRight size={16} /></a> : <div className="contact-placeholder-link" key={label}><Icon size={18} /><span>{label}</span><small>kept private</small></div>)}</div></section>

      <section className="contact-form-section"><div className="contact-form-section__side"><span>to: Om<br />from: you</span><div>✳</div><p>There is room here for the surprising ideas.</p></div><form className="contact-form" onSubmit={handleSubmit}><p className="section-kicker"><Send size={14} /> start with a sentence</p><label>Name<input name="name" placeholder="Your name" type="text" /></label><label>Email<input name="email" placeholder="you@example.com" type="email" /></label><label>What is this about?<select defaultValue="collaboration" name="topic"><option value="collaboration">A collaboration</option><option value="music">Music / live session</option><option value="writing">Writing / creative work</option><option value="other">Something else</option></select></label><label>Leave a note<textarea name="message" onChange={(event) => setMessage(event.target.value)} placeholder="Tell Om a little about what is on your mind." required rows={5} value={message} /></label><button type="submit"><Send size={17} /> send the note <ArrowUpRight size={16} /></button><p className="contact-form__footnote">When the direct line is filed, this note will travel to Om’s inbox.</p></form></section>

      <section className="contact-end"><p>Thank you for<br />making it this far.</p><span>✳</span><Link href="/" className="text-arrow-link">return to the first page <ArrowUpRight size={17} /></Link></section>
    </SiteShell>
  );
}
