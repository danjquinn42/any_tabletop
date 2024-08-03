CREATE
  (mod:Mod {id:'DEFAULT_MOD', name: 'Default Mod',
            description: 'contains a map of ada, 5th edition rule set, templates for classes, species, and NPCs'}),
  (game:Game {id: 'DEFAULT_GAME', name: 'DnD 5th Edition basic rules',
              description: 'This game contains the rules available in the DnD OGL'})
WITH mod, game
CREATE (mod)-[:HAS]->(game)