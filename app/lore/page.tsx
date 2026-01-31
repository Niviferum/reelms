import './lore.css'

export default function LorePage() {
  return (
    <div className="lore">
      <div className="container">
        {/* Header */}
        <header className="lore-header">
          <h1>L'Univers de Reelms</h1>
          <p className="lore-subtitle">
            Plongez dans un monde où chaque choix forge votre légende
          </p>
          {/* <div className="lore-notice">
            <p>⚠️ Page en construction - Contenu temporaire</p>
          </div> */}
        </header>

        {/* Intro */}
        <section className="lore-section section-dark">
          <div className="lore-ornament"></div>
          <h2>Bienvenue à Reelms</h2>
          <p>
            Une petite planète dérive dans une étendue de Vide infini. Null.<br />
            C’est ici que se déroulent nos vies.

            Cinq grandes masses de terre définissent les limites de nos histoires. Chacune peut être explorée en quelques mois,
            mais aucune vie n’est suffisamment longue pour en connaître toutes les spécificités,
            ni toutes les cultures des peuples qui les habitent.

            Parmi ces continents, seuls trois nous sont réellement connus.
          </p>
          <section className="faction">
            <div className='lore-content'></div>
            <p>
              <h3>Comines</h3>
              Terre des Hommes, Comines est le théâtre des plus grandes guerres de l’Histoire. Aujourd’hui encore, certaines frontières demeurent sous tension.
              Ces conflits incessants n’empêchent pourtant pas quelques lieux de prospérer.
              Babel en est l’exemple le plus éclatant : temple des connaissances du monde et siège du Conseil des Mages.
              Une immense forteresse de pierre blanche dressée au cœur du désert,
              lieu isolé et privilégié vers lequel les Hommes se tournent lorsque les heures deviennent trop sombres.

            </p>

          </section>
          <section className="faction">
            <div className='lore-content'></div>
            <p>
              <h3>Seakra</h3>
              Seakra est le lieu de rendez-vous de tous les peuples. Terre chaude, coupée en son centre par un désert de sable infini,
              ses cités vivent sous l’influence d’un empereur tout-puissant qui impose pourtant très peu de lois.
              Il en résulte un marché libre sans limites : tout y a une valeur, rien n’y est réglementé.
              À Seakra, chacun peut trouver la rédemption… ou sombrer dans le désespoir.
            </p>
          </section>
          <section className="faction">
            <div className='lore-content'></div>
            <p>
              <h3>Allia</h3>
              Allia est le cœur du monde. D’immenses forêts de pins couvertes de neige encerclent une longue chaîne de montagnes.
              Ce paysage, aussi majestueux que redoutable, abrite de nombreuses races, cultures et cités, toutes profondément attachées à leur terre.
              Les légendes évoquent une ville nichée au sommet des montagnes, où quelques élus seulement auraient le droit de vivre dans un paradis d’opulence
            </p>
          </section>
        </section>

        {/* Histoire */}
        <section className="lore-section">
          <div className="lore-ornament"></div>
          <h2>Habitants</h2>
          <div className="lore-content">
            <p>
              Ce monde est habité par une myriade de formes de vie, de la plante la plus insignifiante aux créatures divines régnant sur la Grande Jungle de Seakra.<br />

              L’Oratio est l’ordre qui gouverne le monde. Chaque roi, chaque empereur, chaque dieu dépend des décisions prises par les membres de son conseil. Toute race capable de parler la langue commune peut rejoindre cet ordre, à condition de se plier à ses lois et à ses règles.
              En échange, elle obtient le droit d’élire des représentants chargés de défendre ses intérêts au sein du conseil. Parmi les membres fondateurs, nous retrouvons les Humains et les Dieux, au sein d’une liste originelle de quatre races. Plus récemment, des peuples tels que les Zwos ou les Vaskens ont rejoint l’Oratio.<br />

              Certaines races, bien que capables de parler la langue commune, choisissent de ne pas l’apprendre, de ne pas l’utiliser, ou de refuser toute adhésion à l’Oratio. C’est le cas de certains clans gobelins, notamment celui des forêts, ou de certaines races dites sauvages, comme les Gorgons.<br />

              Le monde est aussi parcouru par une multitude de races animales, des plus classiques comme les chiens ou les chevaux jusqu’à des espèces légendaires comme les phénix, en passant par des espèces uniques telles que les luryls et les fuérons.
            </p>


          </div>
        </section>

        {/* Lieux
        <section className="lore-section">
          <div className="lore-ornament">🏰</div>
          <h2>Les Terres de Reelms</h2>
          <div className="lore-grid">
            <div className="lore-card">
              <h3>La Capitale</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel mi
                sed turpis fermentum ornare. Vestibulum ante ipsum primis in faucibus
                orci luctus et ultrices posuere cubilia curae.
              </p>
            </div>

            <div className="lore-card">
              <h3>La Forêt Mystérieuse</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                Aenean lacinia bibendum nulla sed consectetur.
              </p>
            </div>

            <div className="lore-card">
              <h3>Les Montagnes du Nord</h3>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                dapibus ac facilisis in, egestas eget quam. Nullam id dolor id nibh
                ultricies vehicula ut id elit.
              </p>
            </div>

            <div className="lore-card">
              <h3>Le Désert Oublié</h3>
              <p>
                Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
                Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus.
              </p>
            </div>
          </div>
        </section> */}


        {/*         Bestiaire
        <section className="lore-section">
          <div className="lore-ornament">🐉</div>
          <h2>Créatures Légendaires</h2>
          <div className="lore-grid">
            <div className="lore-card">
              <h3>Dragons Anciens</h3>
              <p>
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent
                commodo cursus magna, vel scelerisque nisl consectetur et. Duis mollis,
                est non commodo luctus.
              </p>
            </div>

            <div className="lore-card">
              <h3>Esprits de la Forêt</h3>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam. Vivamus sagittis lacus vel augue
                laoreet rutrum.
              </p>
            </div>

            <div className="lore-card">
              <h3>Gardiens de Pierre</h3>
              <p>
                Sed posuere consectetur est at lobortis. Maecenas faucibus mollis interdum.
                Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur
                purus sit amet fermentum.
              </p>
            </div>

            <div className="lore-card">
              <h3>Ombres du Désert</h3>
              <p>
                Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Integer
                posuere erat a ante venenatis dapibus posuere velit aliquet.
              </p>
            </div>
          </div>
        </section> */}


        <section className="lore-section section-dark">
          <div className="lore-ornament"></div>
          <h2>Flux</h2>
          <div className="lore-content">
            <p>
              Toutes ces créations viennent d’une énergie commune : le Flux. Cette énergie régit chaque particule de l’univers. Tout est flux, de l’eau qui traverse la rivière du village à la peau du chien du voisin. <br />

              Le Flux est une énergie infinie dont le maniement est complexe et fatiguant. Les êtres vivants capables de l’utiliser doivent entraîner leurs compétences en permanence s’ils souhaitent les développer. Ce maniement prend deux formes distinctes.<br />

              La mancie, qui consiste à manipuler le Flux à l’extérieur de son propre corps. Elle peut prendre des formes strictes, comme pour lancer un sort, ou des formes très libres, comme lors de l’utilisation de l’arcane élémentaire.
              Les postures, qui, elles, utilisent le flux qui compose notre corps lui-même. Elles permettent d’améliorer temporairement ses capacités jusqu’à dépasser ses propres limites physiques, en échange d’un effort intense.<br />

              Ces deux formes, bien que fondamentalement différentes, ne sont pas incompatibles ; au contraire, elles se complètent l’une l’autre.
            </p>
          </div>
        </section>


        <section className="lore-section">
          <div className="lore-ornament"></div>
          <h2>Structures</h2>
          <div className="lore-content">
            <p>
              Tous ces éléments prennent forme au sein d’une économie vivante qui s’étend à l’échelle de la planète. Le monde est structuré par différentes organisations, dont l’Oratio, déjà évoqué, qui veille à l’équilibre global et tente d’assurer la survie du monde face aux conflits des êtres vivants et aux catastrophes naturelles.<br />

              Au sein de l’Oratio, de nombreux pays gouvernés par des rois ou des empereurs forment des alliances. Celles-ci peuvent être économiques, politiques ou stratégiques. L’Alliance de Santhar, sur le continent de Comines, en est l’exemple le plus notable. Elle réunit les plus grands empires humains, tels qu’Uthar, le monstre militaire, ou Xothea, le génie scientifique.<br />
              Xothea est devenue un lieu de rencontre pour les plus grands esprits du monde. Fondée sur les plus vastes réserves d’opales élémentaires connues, la cité s’est rapidement imposée comme la capitale technologique la plus importante du monde.

              Une telle organisation repose sur une logistique colossale. D’immenses terres agricoles parcourent le monde entier, leurs cultures variant fortement selon les régions et les climats. Villes et champs sont reliés par des routes sécurisées, sur lesquelles les soldats des nations en paix gardent les caravanes de marchandises et les convois de matières premières.<br />
              Cette logistique est soutenue par les avancées technologiques et par l’exploitation maîtrisée du Flux, afin d’assurer des rendements toujours plus élevés.
              Parlons de cette technologie, qui prend deux formes principales :

              La première approche consiste à utiliser le Flux tel qu’il est, sans chercher à en comprendre ou en altérer la nature profonde. Elle permet la création de parchemins de sorts ou d’enchantements puissants. Les artéfacts et les reliques font également partie de cette forme, bien que nous ne sachions pas vraiment comment les créer.
              La technologie mécanique est la seconde forme, qui, elle, repose sur la création de machines utilisant les ressources du monde pour leurs structures et des opales élémentaires imprégnées de Flux comme source d’énergie. De cette approche est née la Biotechnie, une science capable de remplacer les membres du corps par des parties mécaniques. Elle a également permis le développement de forges avancées et de moyens de transport innovants.<br />
              Certaines rumeurs évoquent même l’existence d’un gigantesque cheval de fer hurlant, appelé train, qui sillonnerait les terres de Wuheye.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}