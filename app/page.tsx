import { OrderForm } from "./components/OrderForm";

const occasions = [
  { number: "01", title: "Birthdays", copy: "Tiny showstoppers made to match the theme, colors, and guest of honor." },
  { number: "02", title: "Showers & weddings", copy: "Elegant favors and dessert-table moments, finished by hand for the big day." },
  { number: "03", title: "Holidays & just because", copy: "Seasonal sweets, thank-yous, team treats, and bright little surprises." },
];

const flavors = ["Funfetti classic", "Chocolate fudge", "Red velvet", "Cookies & cream", "Seasonal special"];

const faqs = [
  ["How far ahead should I order?", "Seven days is a great starting point. Larger or highly detailed orders may need more time, and last-minute requests are always welcome when the calendar allows."],
  ["Is there a minimum order?", "Yes. Custom orders begin at one dozen cake pops so every batch can be made and decorated with care."],
  ["Do you offer pickup or delivery?", "Local pickup is always available. Limited delivery can be arranged depending on the date, location, and order size."],
  ["Can you accommodate allergies?", "Funfetti cake pops contain wheat, milk, egg, and soy. Please share every allergy or dietary concern in your request. Kaylee will discuss ingredients before confirming, but the home kitchen is not allergen-free."],
  ["When is my order confirmed?", "Submitting a request starts the conversation. Your date is confirmed after Kaylee reviews the details and you both agree on the final design, total, and pickup or delivery plan."],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Milk and Cake home">
          <span className="brand-mark" aria-hidden="true">M</span>
          <span>Milk <i>&amp;</i> Cake</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#story">Our story</a>
          <a href="#gallery">Gallery</a>
          <a href="#flavors">Flavors</a>
          <a className="nav-cta" href="#order">Request an order</a>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="#story">Our story</a>
            <a href="#gallery">Gallery</a>
            <a href="#flavors">Flavors</a>
            <a href="#order">Request an order</a>
          </nav>
        </details>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Handmade for the moments that matter</p>
          <h1>Little treats.<br /><em>Big celebrations.</em></h1>
          <p className="hero-intro">Custom cake pops made with joyful details, bold flavors, and a little extra magic for every gathering.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#order">Request an order <span aria-hidden="true">→</span></a>
            <a className="text-link" href="#gallery">Explore the gallery</a>
          </div>
          <p className="availability"><span aria-hidden="true" /> Now booking celebrations</p>
        </div>
        <div className="hero-photo-wrap">
          <div className="photo-note" aria-hidden="true">made with joy</div>
          <img className="hero-photo" src="/kaylee-red-cake-pops.jpg" alt="Red and white drizzled cake pops finished with black satin bows" />
        </div>
      </section>

      <div className="occasion-ribbon" aria-label="Popular occasions">
        <span>Birthdays</span><i aria-hidden="true">✦</i><span>Showers</span><i aria-hidden="true">✦</i><span>Holidays</span><i aria-hidden="true">✦</i><span>Just because</span>
      </div>

      <section className="story section-shell" id="story">
        <div className="story-images">
          <div className="story-backdrop" aria-hidden="true" />
          <img src="/kaylee-white-cake-pops.jpg" alt="White chocolate cake pops decorated with black and polka-dot bows" />
          <span className="story-stamp">rolled · dipped · decorated</span>
        </div>
        <div className="story-copy">
          <p className="section-kicker">Meet the maker</p>
          <h2>Sweet ideas,<br /><em>made by Kaylee.</em></h2>
          <p className="lead">It started with one birthday batch and a kitchen full of sprinkles. Kaylee fell in love with turning simple cake into small, joyful works of art.</p>
          <p>Today, every order is still rolled, dipped, drizzled, and finished by hand. No two celebrations are exactly alike—and Kaylee thinks the treats shouldn&apos;t be either.</p>
          <div className="story-promise">
            <span className="promise-number">12</span>
            <span><strong>Minimum custom order</strong><br />One carefully made dozen</span>
          </div>
        </div>
      </section>

      <section className="occasions section-shell" aria-labelledby="occasions-title">
        <div className="section-heading centered">
          <p className="section-kicker">A pop for every party</p>
          <h2 id="occasions-title">Made for your <em>favorite days.</em></h2>
        </div>
        <div className="occasion-grid">
          {occasions.map((occasion) => (
            <article className="occasion-card" key={occasion.title}>
              <span>{occasion.number}</span>
              <h3>{occasion.title}</h3>
              <p>{occasion.copy}</p>
              <a href="#order" aria-label={`Request cake pops for ${occasion.title}`}>Let&apos;s make it sweet <b aria-hidden="true">↗</b></a>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery" id="gallery" aria-labelledby="gallery-title">
        <div className="gallery-heading section-shell">
          <div>
            <p className="section-kicker light">Fresh from the kitchen</p>
            <h2 id="gallery-title">A little look at<br /><em>the magic.</em></h2>
          </div>
          <p>Classic swirls, crisp ribbons, playful color, and details made for your day.</p>
        </div>
        <div className="gallery-grid section-shell">
          <figure className="gallery-main">
            <img src="/kaylee-red-cake-pops.jpg" alt="A tray of cherry-red cake pops with white drizzle and black bows" />
            <figcaption><span>Cherry swirl</span><span>Custom celebration set</span></figcaption>
          </figure>
          <figure className="gallery-tall">
            <img src="/kaylee-white-cake-pops.jpg" alt="White drizzled cake pops with black bows on a serving plate" />
            <figcaption><span>Black-tie vanilla</span><span>Elegant party favors</span></figcaption>
          </figure>
        </div>
        <p className="gallery-note">Your colors. Your flavor. Your moment.</p>
      </section>

      <section className="flavors section-shell" id="flavors">
        <div className="flavor-intro">
          <p className="section-kicker">The delicious details</p>
          <h2>Pick a flavor.<br /><em>Dream up a look.</em></h2>
          <p>Choose a crowd favorite, then tell Kaylee about the colors, mood, or theme. She&apos;ll shape the final design around your celebration.</p>
          <a className="secondary-button" href="#order">Start your request <span aria-hidden="true">→</span></a>
        </div>
        <div className="flavor-list" aria-label="Available flavors">
          {flavors.map((flavor, index) => (
            <div key={flavor}><span>0{index + 1}</span><strong>{flavor}</strong><i aria-hidden="true">✦</i></div>
          ))}
          <p>Flavor availability may vary. Have another favorite in mind? Ask away.</p>
        </div>
      </section>

      <section className="process section-shell" aria-labelledby="process-title">
        <div className="section-heading centered">
          <p className="section-kicker">How it works</p>
          <h2 id="process-title">From idea to <em>first bite.</em></h2>
        </div>
        <ol className="process-grid">
          <li><span>1</span><h3>Share the details</h3><p>Tell Kaylee about your date, guest count, flavor, and celebration vision.</p></li>
          <li><span>2</span><h3>Make it yours</h3><p>Kaylee follows up to confirm availability, design details, and your custom quote.</p></li>
          <li><span>3</span><h3>Pick up & celebrate</h3><p>Collect your freshly finished pops—or arrange local delivery—and enjoy.</p></li>
        </ol>
      </section>

      <section className="order-section" id="order" aria-labelledby="order-title">
        <div className="order-shell section-shell">
          <div className="order-intro">
            <p className="section-kicker light">Let&apos;s make something sweet</p>
            <h2 id="order-title">Tell Kaylee<br /><em>what you&apos;re dreaming.</em></h2>
            <p>Send the details below and Kaylee will reach out to talk through availability, ideas, and a custom quote.</p>
            <ul>
              <li><span aria-hidden="true">✓</span> One-dozen minimum</li>
              <li><span aria-hidden="true">✓</span> Seven days&apos; notice recommended</li>
              <li><span aria-hidden="true">✓</span> Local pickup and limited delivery</li>
            </ul>
          </div>
          <OrderForm />
        </div>
      </section>

      <section className="faq section-shell" aria-labelledby="faq-title">
        <div className="faq-heading">
          <p className="section-kicker">Good to know</p>
          <h2 id="faq-title">A few sweet<br /><em>answers.</em></h2>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">M</span>
          <div><strong>Milk <i>&amp;</i> Cake</strong><small>Little treats. Big celebrations.</small></div>
        </div>
        <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
        <p>Made in a home kitchen in small batches · © {new Date().getFullYear()} Milk &amp; Cake</p>
      </footer>
    </main>
  );
}
