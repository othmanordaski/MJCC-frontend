interface copyRightInfos {
  text: string;
  link: string;
}
const copyRightInfos: copyRightInfos[] = [
  {
    text: "Conditions d’utilisation",
    link: "https://mjcc.gov.ma/conditions-dutilisation/",
  },
  {
    text: "Politique de confidentialité",
    link: "https://mjcc.gov.ma/fr/politique-de-confidentialite/",
  },
];
const Copyright: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="h-12 bg-white flex justify-center items-center gap-[100px]">
      <div>
        <span className="text-[#4A5972] text-base">
          Ministère de la Jeunesse, de la Culture et de la Communication Tous
          droits réservés © {currentYear}.
        </span>
      </div>
      <div>
        <ul className="flex justify-between gap-[100px]">
          {copyRightInfos.map(({ text, link }, index) => (
            <li key={index}>
              <a href={link}>
                <span className="text-base text-[#4A5972]">{text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Copyright;
