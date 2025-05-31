import { useEffect, useState } from 'react';
import styles from './accueil.module.css';

interface Recipe {
  id: number;
  title: string;
  description: string;
}

const Accueil = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/recipes") 
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch :", err);
        setLoading(false);
      });
  }, []);

    if (loading) return <p>Chargement...</p>;
    
    return (
        <div className={styles.accueilContainer}>
            <div className={styles.popularRecipes}></div>
            <div className={styles.latestRecipes}>
                 <h2>Dernières recettes ajoutées</h2>
                <ul>
                    {recipes.map((recipe) => (
                    <li key={recipe.id}>{recipe.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Accueil;