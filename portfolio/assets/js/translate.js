export async function translate(lang) {
    const enRequest = new Request("/portfolio/locales/en.json");
    const frRequest = new Request("/portfolio/locales/fr.json");

    console.log(navigator.language);
    let response = "";
    if (lang) {
        response = await fetch(lang === 'fr' ? frRequest : enRequest)
        console.log(lang)
        const translation = await response.json();

        // Déterminer quelle page case-study
        if (window.location.pathname.includes('case-study-swiftfox')) {
            translateSwiftFox(translation);
        } else if (window.location.pathname.includes('case-study-snaposaurus')) {
            translateSnaposaurus(translation);
        } else {
            translateTarget(translation);
        }
    }
}

function translateSnaposaurus(translation) {
    // Helper function
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    // Aside menu (navigation snapo)
    setText('aside-home', translation.nav_snapo.navbar_home);
    setText('aside-about', translation.nav_snapo.navbar_about);
    setText('aside-works', translation.nav_snapo.navbar_works);
    setText('aside-contact', translation.nav_snapo.navbar_contact);
    setText('aside-experiences', translation.nav_snapo.navbar_experiences);
    setText('aside-skillset', translation.nav_snapo.navbar_skillset);

    // Title section (snapo)
    setText('looking-for', translation.title_snapo.looking_for);
    setText('main-subtitle', translation.title_snapo.main_subtitle);
    setText('portfolio', translation.title_snapo.portfolio);
    setText('about-title', translation.title_snapo.about_title);

    // About section (snapo)
    const aboutP = document.getElementById('about-p');
    if (aboutP) {
        const aboutParts = translation.p_snapo.about_p.split('\n\n');
        aboutP.textContent = '';
        aboutParts.forEach((part, index) => {
            aboutP.appendChild(document.createTextNode(part));
            if (index < aboutParts.length - 1) {
                aboutP.appendChild(document.createElement('br'));
                aboutP.appendChild(document.createElement('br'));
            }
        });
    }

    // Works section (snapo)
    setText('works-title', translation.works_snapo.title);

    // Récupérer les h3 par leur contenu pour les traduire
    const h3Elements = document.querySelectorAll('#works-p h3');
    if (h3Elements[0]) h3Elements[0].textContent = translation.works_snapo['key-steps'];
    if (h3Elements[1]) h3Elements[1].textContent = translation.works_snapo.challenges;

    setText('phase_1', translation.works_snapo.phase_1);
    setText('phase_2', translation.works_snapo.phase_2);
    setText('phase_3', translation.works_snapo.phase_3);
    setText('phase_4', translation.works_snapo.phase_4);
    setText('phase_5', translation.works_snapo.phase_5);
    setText('phase_6', translation.works_snapo.phase_6);
    setText('phase_7', translation.works_snapo.phase_7);

    // Experience section (snapo)
    setText('experience-title', translation.title_snapo.experience_title);
    const experienceP = document.getElementById('experience-p');
    if (experienceP) {
        const experienceParts = translation.experience_snapo.p.split('\n\n');
        experienceP.textContent = '';
        experienceParts.forEach((part, index) => {
            experienceP.appendChild(document.createTextNode(part));
            if (index < experienceParts.length - 1) {
                experienceP.appendChild(document.createElement('br'));
                experienceP.appendChild(document.createElement('br'));
            }
        });
    }

    // Skillset section (snapo)
    setText('skillset-title', translation.title_snapo.skillset_title);

    // Footer (utilise le footer général)
    setText('footer-cta', translation.footer.cta);
    setText('footer-link-home', translation.footer.link_home);
    setText('footer-link-about', translation.footer.link_about);
    setText('footer-link-works', translation.footer.link_works);
    setText('footer-link-contact', translation.footer.link_contact);
    setText('footer-link-legals', translation.footer.link_legals);
    setText('footer-link-terms', translation.footer.link_terms);
    setText('footer-copy', translation.footer.copyright);

    // Form (utilise le form général)
    setText('form-title', translation.form.form_title);
    setText('form-from', translation.form.form_from);

    const formName = document.getElementById('form-name');
    if (formName) formName.placeholder = translation.form.form_name;

    const formEmail = document.getElementById('form-email');
    if (formEmail) formEmail.placeholder = translation.form.form_email;

    setText('form-message-title', translation.form.form_message_title);

    const formMessage = document.getElementById('form-message');
    if (formMessage) formMessage.placeholder = translation.form.form_message;

    setText('form-button', translation.form.form_button);
}

function translateSwiftFox(translation) {
    // Helper function
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    // Aside menu (navigation case)
    setText('aside-home', translation.nav_case.navbar_home);
    setText('aside-about', translation.nav_case.navbar_about);
    setText('aside-works', translation.nav_case.navbar_works);
    setText('aside-contact', translation.nav_case.navbar_contact);
    setText('aside-experiences', translation.nav_case.navbar_experiences);
    setText('aside-skillset', translation.nav_case.navbar_skillset);

    // Title section (case)
    setText('looking-for', translation.title_case.looking_for);
    setText('main-subtitle', translation.title_case.main_subtitle);
    setText('portfolio', translation.title_case.portfolio);
    setText('about-title', translation.title_case.about_title);

    // About section (case)
    const aboutP = document.getElementById('about-p');
    if (aboutP) {
        const aboutParts = translation.p_case.about_p.split('\n\n');
        aboutP.textContent = '';
        aboutParts.forEach((part, index) => {
            aboutP.appendChild(document.createTextNode(part));
            if (index < aboutParts.length - 1) {
                aboutP.appendChild(document.createElement('br'));
                aboutP.appendChild(document.createElement('br'));
            }
        });
    }

    // Works section (case)
    setText('works-title', translation.works_case.title);
    setText('key-steps', translation.works_case['key-steps']);
    setText('challenges', translation.works_case.challenges);
    setText('phase_1', translation.works_case.phase_1);
    setText('phase_2', translation.works_case.phase_2);
    setText('phase_3', translation.works_case.phase_3);
    setText('phase_4', translation.works_case.phase_4);
    setText('phase_5', translation.works_case.phase_5);

    // Experience section (case)
    setText('experience-title', translation.title_case.experience_title);
    const experienceP = document.getElementById('experience-p');
    if (experienceP) {
        const experienceParts = translation.experience_case.p.split('\n\n');
        experienceP.textContent = '';
        experienceParts.forEach((part, index) => {
            experienceP.appendChild(document.createTextNode(part));
            if (index < experienceParts.length - 1) {
                experienceP.appendChild(document.createElement('br'));
                experienceP.appendChild(document.createElement('br'));
            }
        });
    }

    // Skillset section (case)
    setText('skillset-title', translation.title_case.skillset_title);

    // Footer (case)
    setText('footer-cta', translation.footer.cta);
    setText('footer-link-home', translation.footer.link_home);
    setText('footer-link-about', translation.footer.link_about);
    setText('footer-link-works', translation.footer.link_works);
    setText('footer-link-contact', translation.footer.link_contact);
    setText('footer-link-legals', translation.footer.link_legals);
    setText('footer-link-terms', translation.footer.link_terms);
    setText('footer-copy', translation.footer.copyright);

    // Form (case)
    setText('form-title', translation.form.form_title);
    setText('form-from', translation.form.form_from);

    const formName = document.getElementById('form-name');
    if (formName) formName.placeholder = translation.form.form_name;

    const formEmail = document.getElementById('form-email');
    if (formEmail) formEmail.placeholder = translation.form.form_email;

    setText('form-message-title', translation.form.form_message_title);

    const formMessage = document.getElementById('form-message');
    if (formMessage) formMessage.placeholder = translation.form.form_message;

    setText('form-button', translation.form.form_button);
}

function translateTarget(translation) {
    // Aside menu
    document.getElementById('aside-home').textContent = translation.nav.navbar_home;
    document.getElementById('aside-about').textContent = translation.nav.navbar_about;
    document.getElementById('aside-works').textContent = translation.nav.navbar_works;
    document.getElementById('aside-contact').textContent = translation.nav.navbar_contact;
    document.getElementById('aside-experiences').textContent = translation.nav.navbar_experiences;
    document.getElementById('aside-skillset').textContent = translation.nav.navbar_skillset;

    // Title section
    const mainTitle = document.getElementById('main-title');
    mainTitle.childNodes[0].textContent = translation.title.main_title;
    document.getElementById('title-anim').textContent = translation.title.title_anim;
    document.getElementById('looking-for').textContent = translation.title.looking_for;
    document.getElementById('main-subtitle').textContent = translation.title.main_subtitle;
    document.getElementById('portfolio').textContent = translation.title.portfolio;

    // About section
    document.getElementById('about-title').textContent = translation.title.about_title;
    const aboutP = document.getElementById('about-p');
    const aboutParts = translation.p.about_p.split('\n\n');
    aboutP.textContent = '';
    aboutParts.forEach((part, index) => {
        aboutP.appendChild(document.createTextNode(part));
        if (index < aboutParts.length - 1) {
            aboutP.appendChild(document.createElement('br'));
            aboutP.appendChild(document.createElement('br'));
        }
    });

    // Works section
    const projectTitles = document.querySelectorAll('.banner .title');
    projectTitles.forEach(title => {
        title.textContent = translation.works.projects_title;
    });

    document.getElementById('works-span1').textContent = translation.works.works_span1;
    document.getElementById('works-span2').textContent = translation.works.works_span2;
    document.getElementById('works-span3').textContent = translation.works.works_span3;
    document.getElementById('works-span4').textContent = translation.works.works_span4;

    const learnMoreButtons = document.querySelectorAll('.learn-more-button a');
    learnMoreButtons.forEach(button => {
        if (!button.href.includes('#')) {
            button.textContent = translation.works.learn_more;
        }
    });

    // Controls labels - Mettre à jour uniquement le texte en gardant la structure
    const labels = [
        { id: 'label-1', text: translation.works.label_1, number: '01' },
        { id: 'label-2', text: translation.works.label_2, number: '02' },
        { id: 'label-3', text: translation.works.label_3, number: '03' },
        { id: 'label-4', text: translation.works.label_4, number: '04' }
    ];

    labels.forEach(label => {
        const element = document.getElementById(label.id);
        if (element) {
            console.log(`Processing label: ${label.id}`);
            // Trouver le dernier nœud texte et le remplacer
            const lastTextNode = Array.from(element.childNodes).reverse().find(node => node.nodeType === 3);
            if (lastTextNode) {
                lastTextNode.textContent = ' ' + label.text;
            }
        } else {
            console.error(`Label element not found: ${label.id}`);
        }
    });

    // Experience section
    document.getElementById('experiences-title').textContent = translation.title.experience_title;
    document.getElementById('table-where').innerText = translation.experience.table_where;
    document.getElementById('table-what').textContent = translation.experience.table_what;
    document.getElementById('table-when').textContent = translation.experience.table_when;
    document.getElementById('table-being').textContent = translation.experience.table_being;

    document.getElementById('exp-1-location').textContent = translation.experience.exp_1_location;
    document.getElementById('exp-1-scope').textContent = translation.experience.exp_1_scope;
    document.getElementById('exp-1-period').textContent = translation.experience.exp_1_period;
    document.getElementById('exp-1-post').textContent = translation.experience.exp_1_post;

    document.getElementById('exp-2-location').textContent = translation.experience.exp_2_location;
    document.getElementById('exp-2-scope').textContent = translation.experience.exp_2_scope;
    document.getElementById('exp-2-period').textContent = translation.experience.exp_2_period;
    document.getElementById('exp-2-post').textContent = translation.experience.exp_2_post;

    document.getElementById('exp-3-location').textContent = translation.experience.exp_3_location;
    document.getElementById('exp-3-scope').textContent = translation.experience.exp_3_scope;
    document.getElementById('exp-3-period').textContent = translation.experience.exp_3_period;
    document.getElementById('exp-3-post').textContent = translation.experience.exp_3_post;

    // Skillset section
    document.getElementById('skillset-title').textContent = translation.title.skillset_title;

    // Footer
    document.getElementById('footer-cta').textContent = translation.footer.cta;
    document.getElementById('footer-link-home').textContent = translation.footer.link_home;
    document.getElementById('footer-link-about').textContent = translation.footer.link_about;
    document.getElementById('footer-link-works').textContent = translation.footer.link_works;
    document.getElementById('footer-link-contact').textContent = translation.footer.link_contact;
    document.getElementById('footer-link-legals').textContent = translation.footer.link_legals;
    document.getElementById('footer-link-terms').textContent = translation.footer.link_terms;
    document.getElementById('footer-copy').textContent = translation.footer.copyright;

    // Form
    document.getElementById('form-title').textContent = translation.form.form_title;
    document.getElementById('form-from').textContent = translation.form.form_from;
    document.getElementById('form-name').placeholder = translation.form.form_name;
    document.getElementById('form-email').placeholder = translation.form.form_email;
    document.getElementById('form-message-title').textContent = translation.form.form_message_title;
    document.getElementById('form-message').placeholder = translation.form.form_message;
    document.getElementById('form-button').textContent = translation.form.form_button;
}

globalThis.addEventListener('DOMContentLoaded', translate);