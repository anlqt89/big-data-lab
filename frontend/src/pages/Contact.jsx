import { SetFavicon } from "../components/SetFavicon";
import { FAVICON_TITLES } from "../global/constants";

export const Contact = ()=>{
    SetFavicon(`${FAVICON_TITLES.BIG_DATA_LAB} | ${FAVICON_TITLES.CONTACT}`);
    return (
        <div className="contact-container">
            <div className="contact-header">
                <span className="info-label">System.Connect()</span>
                <h1 style={{ fontSize: '42px', margin: '10px 0' }}>
                    Let's Build <span style={{ color: 'var(--accent-emerald)' }}>Together.</span>
                </h1>
                <p style={{ color: 'var(--global-color-placeholder-1)' }}>
                    Based in Dallas-Fort Worth, Texas. Open to MSCS/BSCS level roles.
                </p>
            </div>

            <div className="contact-card">
                <form>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label className="info-label">Name</label>
                            <input type="text" className="contact-input" placeholder="An Lam" />
                        </div>
                        <div>
                            <label className="info-label">Email</label>
                            <input type="email" className="contact-input" placeholder="email@example.com" />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <label className="info-label">Message</label>
                        <textarea 
                            className="contact-input" 
                            rows="5" 
                            placeholder="Describe your project or role..."
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">
                        SEND MESSAGE
                    </button>
                </form>
            </div>

            <div className="contact-footer" style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{ fontStyle: 'var(--font-type-2)', color: 'var(--global-color-placeholder-1)' }}>
                    LinkedIn: /in/anlamtech • GitHub: /anlqt89
                </p>
            </div>
        </div>
    );
}