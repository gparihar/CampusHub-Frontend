import {
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

function Contact() {
  const contactItems = [
    {
      title: "Email",
      detail: "support@campushub.edu",
      icon: Mail,
    },
    {
      title: "Phone",
      detail: "+91 9082491195",
      icon: Phone,
    },
    {
      title: "Office",
      detail: "Student Activity Center",
      icon: Building2,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="ch-container text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <MessageCircle className="h-7 w-7" />
          </div>
          <p className="ch-eyebrow mt-6">Contact</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            We are here to help
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Reach out for CampusHub support, event coordination, club updates,
            or student account questions.
          </p>
        </div>
      </section>

      <section className="ch-container grid gap-8 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="ch-card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-black text-slate-950">{item.title}</h2>
                    <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="rounded-3xl bg-slate-950 p-6 text-white">
            <MapPin className="h-7 w-7 text-indigo-300" />
            <h2 className="mt-4 text-xl font-black">Campus address</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Main Campus, Academic Block, Student Affairs Office.
            </p>
          </div>
        </div>

        <form className="ch-card p-8">
          <h2 className="text-2xl font-black text-slate-950">
            Send a message
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            This form is ready for UI presentation and can be connected to a
            support workflow later.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-bold text-slate-700">Name</label>
              <input className="ch-input mt-2 w-full" placeholder="Your name" />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">Email</label>
              <input className="ch-input mt-2 w-full" placeholder="you@example.com" />
            </div>
          </div>

          <div className="mt-5">
            <label className="text-sm font-bold text-slate-700">Subject</label>
            <input className="ch-input mt-2 w-full" placeholder="How can we help?" />
          </div>

          <div className="mt-5">
            <label className="text-sm font-bold text-slate-700">Message</label>
            <textarea
              rows="5"
              className="ch-input mt-2 w-full resize-none"
              placeholder="Tell us what you need..."
            />
          </div>

          <button type="button" className="ch-button-primary mt-6">
            <Send className="h-4 w-4" />
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}

export default Contact;
