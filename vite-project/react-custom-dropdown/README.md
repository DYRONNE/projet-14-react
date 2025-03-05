# React Custom Dropdown

`react-custom-dropdown` est un composant React simple et flexible permettant de créer des menus déroulants personnalisables.

## Installation

Pour installer le composant, tu peux utiliser npm ou yarn :

```bash
npm install dylanronne-react-custom-dropdown
# ou
yarn add dylanronne-react-custom-dropdown
Utilisation

Voici comment tu peux utiliser le composant Dropdown dans ton projet :

Exemple d'utilisation
import React, { useState } from 'react';
import Dropdown from 'dylanronne-react-custom-dropdown';

const MyComponent = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <Dropdown
        label="Select a fruit"
        options={['Apple', 'Banana', 'Cherry']}
        defaultValue="Apple"
        onChange={handleChange}
      />
      <p>Selected Value: {selectedValue}</p>
    </div>
  );
};

export default MyComponent;
Props

Voici les props disponibles pour personnaliser le comportement de ton Dropdown :

Prop	Type	Description
label	string	Le texte à afficher au-dessus du menu déroulant.
options	string[]	Un tableau de chaînes de caractères pour les options du dropdown.
defaultValue	string (optionnel)	La valeur initiale sélectionnée. Si non définie, la première option sera sélectionnée.
onChange	(value: string) => void	Fonction qui est appelée lorsque l'utilisateur sélectionne une option. Elle reçoit la valeur de l'option sélectionnée.
Exemple de style (CSS)

Si tu veux personnaliser le style de ton Dropdown, voici un exemple de base :

.dropdown {
  padding: 10px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;
  background-color: white;
  color: black;
}

.dropdown:focus {
  outline: none;
  border-color: #0053a0;
}
Tu peux ajouter ce CSS à ton fichier ou adapter les styles selon tes besoins.

Personnalisation

Le composant est conçu pour être flexible. Tu peux ajouter des classes personnalisées ou ajuster les styles comme tu le souhaites.

Dépendances

Ce composant utilise React, donc assure-toi que tu as installé react et react-dom dans ton projet.

React (>= 16.8.0)
Contribuer

Si tu souhaites contribuer au projet, n'hésite pas à ouvrir des issues ou des pull requests. Merci de respecter les directives du projet et de tester ton code avant de soumettre des changements.

License

Ce projet est sous licence ISC. Voir le fichier LICENSE pour plus de détails.