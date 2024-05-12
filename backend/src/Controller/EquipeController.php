<?php

namespace App\Controller;

use App\Entity\Equipe;
use App\Entity\Joueur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;

#[Route('/equipe')]
class EquipeController extends AbstractController
{
    #[Route('/', name: 'app_equipe')]
    public function getEquipe(UserInterface $user = null, EntityManagerInterface $entityManager): JsonResponse
    {
        $equipes = [];
        $retourEquipes = [];
        if($user != null)
        {
            $equipes = $entityManager->getRepository(Equipe::class)->findBy(["user" => $user->getId()]);
        }
        for($i = 0; $i < sizeof($equipes); $i++)
        {
            $retourEquipes[$i]["nomEquipe"] = $equipes[$i]->getNomEquipe();
            $retourEquipes[$i]["idEquipe"] = $equipes[$i]->getId();
        }
        return $this->json($retourEquipes);
    }


    #[Route('/new', name: 'app_equipe_new', methods: ['POST'])]
    public function newEquipe(Request $request, UserInterface $user = null, EntityManagerInterface $entityManager): JsonResponse
    {
        $joueurs = json_decode($request->getContent(), true)["joueurs"];
        $nomequipe = json_decode($request->getContent(), true)["nomequipe"];
        $postes = [
            "G",
            "DD",
            "DG",
            "DC",
            "MDG",
            "MDD",
            "MDC",
            "MG",
            "MD",
            "MC",
            "MOG",
            "MOD",
            "MOC",
            "AG",
            "AD",
            "AC"
        ];
        $tableauRetour = [];
        $equipe = new Equipe();
        if($nomequipe != null && is_string($nomequipe) && strlen($nomequipe) <= 255)
        {
            $equipe->setNomEquipe($nomequipe);
            $equipe->setUser($user);
            $entityManager->persist($equipe);
            for($i = 0; $i < sizeof($joueurs); $i++)
            {
                if($joueurs[$i]["nom"] != null && $joueurs[$i]["nom"] != "" && is_string($joueurs[$i]["nom"]) && strlen($joueurs[$i]["nom"]) <= 255)
                {
                    if($joueurs[$i]["prenom"] != null && $joueurs[$i]["prenom"] != "" && is_string($joueurs[$i]["prenom"]) && strlen($joueurs[$i]["prenom"]) <= 255)
                    {
                        if($joueurs[$i]["age"] != null && $joueurs[$i]["age"] <= 100000)
                        {
                            if(in_array($joueurs[$i]["poste"], $postes))
                            {
                                if(is_string($joueurs[$i]["description"]) && strlen($joueurs[$i]["description"]) < 255)
                                {
                                    $joueur = new Joueur();
                                    $joueur->setNom($joueurs[$i]["nom"]);
                                    $joueur->setPrenom($joueurs[$i]["prenom"]);
                                    $joueur->setAge($joueurs[$i]["age"]);
                                    $joueur->setPoste($joueurs[$i]["poste"]);
                                    $joueur->setDescription($joueurs[$i]["description"]);
                                    $joueur->setEquipe($equipe);
                                    $entityManager->persist($joueur);
                                }
                                else
                                {
                                    $tableauRetour[$i]["champs"] = "description";
                                    $tableauRetour[$i]["message"] = "Description incorrect !";
                                }
                            }
                            else
                            {
                                $tableauRetour[$i]["champs"] = "poste";
                                $tableauRetour[$i]["message"] = "Poste incorrect !";
                            }
                        }
                        else
                        {
                            $tableauRetour[$i]["champs"] = "age";
                            $tableauRetour[$i]["message"] = "Age incorrect !";
                        }
                    }
                    else
                    {
                        $tableauRetour[$i]["champs"] = "prenom";
                        $tableauRetour[$i]["message"] = "Prenom incorrect !";
                    }
                }
                else
                {
                    $tableauRetour[$i]["champs"] = "nom";
                    $tableauRetour[$i]["message"] = "Nom incorrect !";
                }
            }
            if(sizeof($tableauRetour) == 0)
            {
                $entityManager->flush();
            }
        }
        else
        {
            $tableauRetour[0]["champs"] = "nomequipe";
            $tableauRetour[0]["message"] = "Nom incorrect !";
        }
        return $this->json($tableauRetour);
    }
}
