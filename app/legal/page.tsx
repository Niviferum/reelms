import '../globals.css'
import './legal.css'

export default function LegalPage() {
  return (
    <div className="legal">
      <div className="container">
        {/* Header */}
        <header className="legal-header">
          <h1>Mentions Légales et Conditions Générales de Vente</h1>
          <p className="legal-date">
            Applicables à compter du 5 janvier 2026<br />
            Dernière mise à jour : 5 janvier 2026
          </p>
        </header>

        {/* Résumé important */}
        <div className="legal-summary">
          <h2>Résumé des points importants à destination des clients :</h2>
          <ul>
            <li>Les retards de plus de 20 min aux prestations de groupe rétrogradent les participants au grade "spectateur"</li>
            <li>Pas de droit de rétractation sur les prestations de groupe datées, mais un remboursement amical par coupon de réduction</li>
            <li>Annulation des prestations individuelles jusqu'à 24h à l'avance pour être remboursé</li>
            <li>Les retards de plus de 20 min aux prestations individuelles comptent comme une annulation de la part du client</li>
            <li>Report possible des prestations de groupe si moins de 3 participants ou remboursement possible du paiement initial (au choix du client)</li>
            <li>La préparation d'une prestation ou le début de consommation d'un produit avant la fin du délai de rétractation par le client équivaut à sa demande expresse de commencement ainsi qu'à son renoncement à son droit de rétractation</li>
            <li>Tous les contenus sont soumis au droit d'auteur et à la propriété intellectuelle à l'international</li>
            <li>Utilisation de la plateforme Discord comme serveur vocal durant les prestations individuelles et les prestations de groupe</li>
          </ul>
        </div>

        {/* Table des matières */}
        <nav className="legal-toc">
          <h2>Sommaire</h2>
          <ul>
            <li><a href="#mentions">Mentions Légales</a></li>
            <li><a href="#propriete">Propriété Intellectuelle</a></li>
            <li><a href="#liens">Liens Hypertextes et Partenariats</a></li>
            <li><a href="#cgv">Conditions Générales de Vente</a></li>
            <li><a href="#donnees">Données Personnelles</a></li>
            <li><a href="#responsabilite">Limitation de Responsabilité</a></li>
            <li><a href="#force-majeure">Force Majeure</a></li>
            <li><a href="#tribunal">Tribunal Compétent</a></li>
          </ul>
        </nav>

        {/* Mentions Légales */}
        <section id="mentions" className="legal-section">
          <h2>Mentions Légales</h2>
          
          <h3>Éditeur du site</h3>
          <p>
            ANDRIEU Lucas<br />
            [Adresse à compléter]<br />
            Email : contact@reelms.fr<br />
            Discord : [Lien du serveur Discord]
          </p>

          <h3>Hébergement</h3>
          <p>
            Ce site est hébergé par Vercel Inc.<br />
            340 S Lemon Ave #4133<br />
            Walnut, CA 91789, USA
          </p>

          <h3>Base de données</h3>
          <p>
            Supabase Inc.<br />
            Plateforme de base de données PostgreSQL
          </p>
        </section>

        {/* Propriété Intellectuelle */}
        <section id="propriete" className="legal-section">
          <h2>Propriété Intellectuelle</h2>
          
          <p>
            L'ensemble des textes, logos, graphismes, vidéos, images, photos et sons présents sur le Site, 
            ainsi que les contenus publiés par ANDRIEU Lucas sur les réseaux sociaux sont soumis au droit 
            d'auteur et au titre de la propriété intellectuelle à l'international. Toute reproduction, 
            transformation, traduction, adaptation, exploitation, diffusion, que ce soit de manière totale 
            ou partielle, de ces éléments est strictement interdite.
          </p>

          <p>
            Conformément aux dispositions du code de la propriété intellectuelle, toute violation sera 
            sanctionnée en tant que contrefaçon. Pour tout autre usage, une autorisation écrite, datée 
            et signée du responsable de l'entreprise ANDRIEU Lucas sera nécessaire, celle-ci précisant 
            le cadre des usages autorisés.
          </p>
        </section>

        {/* Liens Hypertextes */}
        <section id="liens" className="legal-section">
          <h2>Liens Hypertextes et Partenariats</h2>
          
          <p>
            Certaines pages du Site ou des espaces personnels Clients associés comportent des liens 
            hypertextes qui redirigent les utilisateurs vers des sites de partenaires à l'entreprise 
            ANDRIEU Lucas ou vers d'autres sites tiers. Il appartient à chaque utilisateur de consulter 
            les mentions légales et conditions générales de vente de ces sites, et de les respecter.
          </p>

          <p>
            L'entreprise ANDRIEU Lucas ne pourra en aucun cas être tenue pour responsable des informations 
            diffusées sur ces sites, ainsi que de toute conséquence ou de tout préjudice qui y serait lié.
          </p>
        </section>

        {/* CGV */}
        <section id="cgv" className="legal-section">
          <h2>Conditions Générales de Vente</h2>

          <h3>Article 1 : Objet et champ d'application</h3>
          
          <p>
            Les présentes Conditions Générales de Vente (ci-après "CGV") s'appliquent à toute commande 
            passée sur le Site et ses sous-domaines (ci-après "le Site"). Elles détaillent les droits et 
            obligations entre l'entreprise de Monsieur ANDRIEU Lucas (ci-après dénommée "Vendeur") et 
            chaque client particulier ou professionnel en tant que personne physique ou morale (ci-après 
            "Client"), dans le cadre de la vente des produits et prestations de service suivants :
          </p>

          <ul>
            <li>Soutien personnalisé (prestation individuelle - Coaching)</li>
            <li>Animation de parties de jeu de rôle en ligne (prestations de groupe datées - Oneshot, Scénario)</li>
            <li>Commandes personnalisées adaptées aux besoins spécifiques du Client</li>
          </ul>

          <p>
            Ces prestations sont conformes aux descriptifs accessibles sur les pages de vente du Site. 
            Ces descriptifs peuvent être modifiés librement et à tout moment par le Vendeur dans le but 
            d'améliorer la satisfaction client ou la rentabilité financière du Vendeur.
          </p>

          <p>
            En cochant la case "J'accepte les Conditions Générales de Vente et la Politique de 
            confidentialité" lors de sa commande de produits ou de prestations sur le Site, le Client 
            reconnaît : avoir pris connaissance des présentes CGV préalablement à toute commande passée 
            sur le Site du Vendeur, accepter les présentes CGV sans restriction ni réserve, avoir pris 
            entièrement connaissance des pages de vente des produits ou prestations achetés, s'être 
            suffisamment renseigné afin de vérifier l'adéquation entre l'offre et ses besoins, et avoir 
            bien consulté les éventuelles conditions particulières à chaque produit et prestation.
          </p>

          <h4>Liste des mises à jour des CGV :</h4>
          <ul>
            <li>05/01/2025 : Adaptation pour la plateforme Reelms</li>
          </ul>

          <h3>Article 2 : Commande de produits ou prestations</h3>

          <h4>2.1 - Prix, modalités de paiement et facturation</h4>
          
          <p>
            Les prix des produits ou prestations vendus sur le Site du Vendeur sont ceux en vigueur au 
            jour de l'achat sur le Site, la date du mail de confirmation reçu par le Client ainsi que le 
            règlement par carte bancaire du Client lors de l'enregistrement de sa commande faisant foi. 
            Les prix sont libellés en euros et calculés hors taxes : Vendeur non assujetti à la TVA en 
            date des présentes CGV (article 293 B du Code général des impôts).
          </p>

          <p>
            Le Vendeur s'accorde le droit de modifier ses tarifs à tout moment, lors d'offres 
            promotionnelles ou d'opérations ponctuelles. Il pourra librement émettre des coupons de 
            réduction aux modalités variables, et tout coupon aura le droit d'être offert à un tiers 
            ou employé à sa discrétion par le Client. Chaque Client qui reçoit un coupon de réduction 
            en reçoit également l'entière responsabilité, quelle que soit la façon dont il est ensuite utilisé.
          </p>

          <p>
            Le paiement s'effectue en ligne de manière sécurisée via notre prestataire de paiement Stripe. 
            Une fois le paiement validé, le Client reçoit une confirmation par email et peut accéder à 
            son espace personnel pour gérer ses réservations.
          </p>

          <h4>2.2 - Livraison des produits et prestations par le Vendeur</h4>
          
          <p>
            Sauf annulation ou report du fait du Vendeur, la livraison de chaque prestation de groupe 
            datée se déroulera à la date indiquée lors de l'achat, les horaires étant indiqués pour la 
            France métropolitaine. Sauf annulation ou report de l'une ou l'autre des parties, les 
            prestations individuelles nécessitant la prise d'un rendez-vous entre le Client et le Vendeur 
            se dérouleront aux dates convenues entre les parties via l'outil de planification Calendly.
          </p>

          <p>
            En raison de leur mode de délivrabilité ou dans le cas de promotions ou événements spéciaux, 
            le Vendeur se réserve le droit de limiter l'accès à certains produits et prestations, que ce 
            soit en quantité, en nombre de places disponibles ou en durée d'accès.
          </p>

          <h4>2.3 - Utilisation des produits ou prestations du fait du Client</h4>
          
          <p>
            Le Client est l'unique responsable de sa propre consultation, sa propre utilisation et sa 
            propre interprétation des divers supports et documents fournis. Le Vendeur s'engage sur une 
            obligation de résultat uniquement concernant la livraison des produits et la réalisation 
            effective des prestations individuelles achetés par le Client. Le Vendeur ne s'engage à 
            fournir qu'une obligation de moyen concernant les prestations de groupe et toute conséquence 
            résultant de l'usage par le Client des produits et prestations.
          </p>

          <p>
            <strong>Ponctualité et participation :</strong>
          </p>
          <ul>
            <li>
              Tout retard de plus de 20 minutes aux prestations de groupe datées sera susceptible de 
              rétrograder la participation du Client au rôle de simple spectateur, afin de ne pas 
              perturber le bon déroulement de la prestation pour les autres participants.
            </li>
            <li>
              Dans le cas où le Client dérangerait le bon déroulement d'une prestation de groupe par 
              des nuisances (interruptions orales fréquentes, téléphone qui sonne, irrespect, propos 
              illicites…), le Client recevra un avertissement oral puis par message du Vendeur et pourra 
              voir sa participation rétrogradée au rôle de simple spectateur.
            </li>
            <li>
              Quel que soit le type de nuisance qui amène le Client à être rétrogradé comme spectateur 
              ou banni, aucun remboursement ne pourra être accordé au Client.
            </li>
          </ul>

          <p>
            <strong>Annulation par le Client :</strong>
          </p>
          <ul>
            <li>
              <strong>Prestations de groupe :</strong> Selon l'article L221-28 du Code de la consommation, 
              les prestations de services d'activités de loisirs qui doivent être fournies à une date ou 
              à une période déterminée sont exclues du droit de rétractation. Le Vendeur se réserve 
              cependant le droit d'adresser au Client un remboursement sous la forme d'un coupon de 
              réduction d'un montant égal au prix réglé par le Client pour la réservation de sa place.
            </li>
            <li>
              <strong>Prestations individuelles :</strong> Le Client qui souhaite annuler ou reporter 
              un rendez-vous doit en avertir le Vendeur au minimum 24 heures à l'avance. Si cette 
              condition n'est pas remplie, le paiement restera entièrement dû au Vendeur.
            </li>
            <li>
              En cas de retard du Client à un rendez-vous lié aux prestations individuelles, le rendez-vous 
              se terminera à l'heure prévue initialement. Si ce retard devait excéder 15 minutes, le 
              rendez-vous sera considéré comme annulé du fait du Client.
            </li>
          </ul>

          <p>
            <strong>Plateformes partenaires :</strong>
          </p>
          <p>
            Le Client est informé que, dans le cadre des prestations de service, le Vendeur utilise 
            les plateformes suivantes :
          </p>
          <ul>
            <li>
              <strong>Discord</strong> (https://discord.com/) : plateforme de communication vocale 
              utilisée lors des prestations. Inscription gratuite requise.
            </li>
            <li>
              <strong>Roll20</strong> (https://roll20.net/) : plateforme d'organisation des parties 
              de jeu de rôle en ligne. Inscription gratuite requise.
            </li>
          </ul>
          <p>
            L'accès à ces plateformes partenaires facilite le bon déroulement des prestations et 
            n'est en aucun cas une obligation pour les Clients. La validation de toute commande de 
            prestation par le Client entraîne une acceptation tacite de l'usage de ces plateformes.
          </p>

          <h4>2.4 - Non-réalisation de prestations du fait du Vendeur</h4>
          
          <p>
            <strong>Prestations de groupe :</strong> Peuvent être sujettes à un report ou une annulation 
            si l'une des conditions suivantes ne peut être remplie : disponibilité d'un animateur en 
            visioconférence, aucun dysfonctionnement technique, 3 participants minimum présents.
          </p>
          <p>
            Dans ce cas, le Client aura le choix entre reporter sa réservation sur une prestation future 
            ou demander un remboursement qui sera directement envoyé sur son compte bancaire (via Stripe) 
            dans les 7 jours suivant sa demande.
          </p>

          <p>
            <strong>Prestations individuelles :</strong> Peuvent être sujettes à un report ou une 
            annulation si : indisponibilité du Vendeur ou dysfonctionnement technique. En cas d'annulation 
            du fait du Vendeur, celui-ci proposera en priorité de reporter le rendez-vous à une date 
            ultérieure. Le Client peut demander le remboursement s'il renonce à la réalisation de la 
            prestation.
          </p>

          <h3>Article 3 : Droit de rétractation</h3>
          
          <p>
            En principe, le Client est libre de se rétracter sans apporter de motif dans un délai de 
            14 jours. Le délai de rétractation expire 14 jours après le jour de l'inscription du Client 
            sur le Site.
          </p>

          <p>
            Pour exercer ce droit de rétractation, le Client doit contacter le Vendeur à l'adresse : 
            contact@reelms.fr
          </p>

          <p>
            <strong>Exceptions au droit de rétractation :</strong>
          </p>
          <p>
            Conformément aux dispositions de l'article L221-28 du Code de la consommation, le droit 
            de rétractation est exclu pour :
          </p>
          <ul>
            <li>
              Les prestations de services pleinement exécutées avant la fin du délai de rétractation 
              avec l'accord préalable et exprès du consommateur
            </li>
            <li>
              Les prestations de loisirs qui doivent être fournies à une date ou période déterminée
            </li>
            <li>
              Le contenu numérique dont l'exécution a commencé avec le consentement exprès du Client
            </li>
          </ul>

          <p>
            Ainsi, tout achat sur le Site vaut demande expresse de commencement de la part du Client 
            avant la fin du délai de rétractation ainsi que renoncement à son droit de rétractation à 
            partir du moment où le Client participe à la préparation d'une prestation ou fixe la date 
            de réalisation avant la fin de son délai de rétractation.
          </p>
        </section>

        {/* Données Personnelles */}
        <section id="donnees" className="legal-section">
          <h2>Article 4 : Données Personnelles du Client</h2>
          
          <p>
            Conformément à la loi nº 78-17 du 6 janvier 1978 modifiée (dite « loi Informatique et Libertés ») 
            et au Règlement Général sur la Protection des Données (RGPD), les Clients sont informés que 
            des données à caractère personnel les concernant font l'objet d'un traitement automatisé.
          </p>

          <h3>Données collectées</h3>
          <p>
            Via l'authentification Discord OAuth, nous collectons :
          </p>
          <ul>
            <li>Identifiant Discord</li>
            <li>Nom d'utilisateur Discord</li>
            <li>Avatar Discord</li>
            <li>Adresse email (si disponible)</li>
          </ul>

          <h3>Finalités du traitement</h3>
          <ul>
            <li>Gestion des comptes clients et authentification</li>
            <li>Traitement des commandes et réservations</li>
            <li>Communication concernant les prestations</li>
            <li>Analyses statistiques et amélioration des services</li>
          </ul>

          <h3>Durée de conservation</h3>
          <p>
            Les données personnelles sont conservées tant que le compte Client est actif. Le Client 
            peut demander la suppression de son compte et de ses données à tout moment.
          </p>

          <h3>Droits des personnes concernées</h3>
          <p>
            Conformément à la loi Informatique et libertés et au RGPD, le Client dispose des droits suivants :
          </p>
          <ul>
            <li>Droit d'accès aux données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit d'opposition au traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit de retirer son consentement</li>
          </ul>

          <p>
            Pour exercer ces droits, contactez : privacy@reelms.fr
          </p>

          <p>
            Toute personne concernée dispose d'un droit de réclamation auprès de la Commission 
            Nationale Informatique et Libertés (CNIL).
          </p>

          <h3>Partage des données</h3>
          <p>
            Les données personnelles peuvent être partagées avec :
          </p>
          <ul>
            <li>Stripe (traitement des paiements sécurisés)</li>
            <li>Supabase (hébergement de base de données)</li>
            <li>Discord (authentification et communication)</li>
          </ul>
          <p>
            Aucune donnée n'est vendue à des tiers à des fins commerciales.
          </p>
        </section>

        {/* Limitation de responsabilité */}
        <section id="responsabilite" className="legal-section">
          <h2>Article 5 : Limitation de responsabilité</h2>
          
          <p>
            Le Client est informé que les transactions et l'accès aux produits et prestations sont en 
            lien avec d'autres sites ou plateformes (Discord, Roll20, Stripe, Supabase), qui sont conçus, 
            administrés et sécurisés par des tiers, sous leur unique responsabilité. Le Vendeur décline 
            donc toute responsabilité concernant l'utilisation des données Client par des tiers.
          </p>

          <p>
            Le Vendeur s'engage à tout mettre en œuvre pour faire perdurer l'accès aux produits et 
            services. Le Vendeur se dégage néanmoins de la responsabilité et des conséquences sur le 
            Client de toute panne, défaillance ou contrainte technique due aux réseaux Internet, à 
            l'hébergeur et aux autres tiers liés au Site.
          </p>

          <p>
            En aucun cas la responsabilité du Vendeur ne saurait être mise en cause au titre des 
            dommages subis par un Client en raison du comportement inapproprié d'un autre Client.
          </p>

          <p>
            Si la nullité d'une clause contractuelle des présentes CGV venait à être prononcée, cela 
            n'entraînerait en aucun cas la nullité des autres clauses des CGV.
          </p>
        </section>

        {/* Propriété intellectuelle (Article 6) */}
        <section className="legal-section">
          <h2>Article 6 : Clause de propriété intellectuelle</h2>
          
          <p>
            Le Vendeur est seul propriétaire de l'ensemble des produits et prestations qu'il propose 
            sur le Site, au titre du droit d'auteur et de la propriété intellectuelle à l'international. 
            L'ensemble des contenus et supports pédagogiques (support papier, numérique, oral, vidéo, 
            audio…) demeurent la propriété exclusive du Vendeur.
          </p>

          <p>
            À ce titre, ils ne peuvent faire l'objet d'aucune transformation, reproduction, exploitation, 
            diffusion non expressément autorisée sans accord express du Vendeur. Le Client n'est pas 
            autorisé à utiliser le contenu des produits et prestations pour former des tiers.
          </p>

          <h3>Droit à l'image et contenus</h3>
          <p>
            En acceptant les présentes CGV, le Client autorise l'enregistrement, la reproduction et 
            la diffusion de photographies, extraits vidéos et audios issus des prestations organisées 
            par le Vendeur. Ces contenus pourront être exploités pour la promotion des activités du 
            Vendeur (site web, réseaux sociaux, publicité).
          </p>

          <p>
            Le Vendeur s'engage à préserver l'anonymat du Client qui le souhaite ou à ne le mentionner 
            que par un pseudonyme. Le Client peut à tout moment retirer son consentement sur simple 
            demande écrite au Vendeur.
          </p>
        </section>

        {/* Force majeure */}
        <section id="force-majeure" className="legal-section">
          <h2>Article 7 : Force majeure</h2>
          
          <p>
            La responsabilité du Vendeur ne pourra être mise en cause si la non-exécution ou le retard 
            dans l'exécution de l'une de ses obligations décrites dans les présentes CGV découle d'un 
            cas de force majeure.
          </p>

          <p>
            À ce titre, la force majeure s'entend de tout événement extérieur, imprévisible et 
            irrésistible au sens de l'article 1218 du Code civil. Liste non exhaustive : grèves, 
            conflits sociaux, désastres naturels, interruption des approvisionnements en énergie, 
            interruption des communications ou des transports, pandémie, etc.
          </p>
        </section>

        {/* Tribunal compétent */}
        <section id="tribunal" className="legal-section">
          <h2>Article 8 : Tribunal compétent et médiation</h2>
          
          <p>
            Tout litige relatif à l'interprétation, la validité, l'exécution, aux conséquences et à 
            la résiliation des présentes CGV est soumis au droit français.
          </p>

          <h3>Médiation de la consommation</h3>
          <p>
            Le Client pourra, en cas de litige, solliciter le recours à un médiateur de la consommation 
            sur le site :
          </p>
          <p>
            <a href="https://www.economie.gouv.fr/mediation-conso/vous-etes-consommateur" target="_blank" rel="noopener noreferrer">
              https://www.economie.gouv.fr/mediation-conso/vous-etes-consommateur
            </a>
          </p>

          <p>
            Le médiateur tentera, en toute indépendance et impartialité, de rapprocher les parties 
            en vue d'aboutir à une solution amiable. Les parties restent libres d'accepter ou de 
            refuser le recours à la médiation ainsi que la solution proposée.
          </p>

          <h3>Plateforme européenne de RLL</h3>
          <p>
            Le Client peut également saisir la Plateforme européenne de Règlement en Ligne des Litiges :
          </p>
          <p>
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
              https://ec.europa.eu/consumers/odr
            </a>
          </p>

          <p>
            À défaut de résolution amiable, le litige sera porté devant le Tribunal de commerce compétent.
          </p>
        </section>

        {/* Contact */}
        <section className="legal-contact">
          <h2>Contact</h2>
          <p>
            Pour toute question concernant ces mentions légales et CGV :
          </p>
          <ul>
            <li>Email : contact@reelms.fr</li>
            <li>Email données personnelles : privacy@reelms.fr</li>
            <li>Discord : [Lien du serveur]</li>
          </ul>
        </section>
      </div>
    </div>
  )
}