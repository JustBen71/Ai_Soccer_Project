<?php

namespace App\Controller;

use App\Entity\Equipe;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class MatchController extends AbstractController
{
    #[Route('/match/{id}', name: 'app_match')]
    public function launchMatch(EntityManagerInterface $entityManager, Equipe $equipe, UserInterface $user = null, HttpClientInterface $httpClient): JsonResponse
    {
        $tableauRetour = [];
        if($user != null && $equipe->getUser()->getId() == $user->getId())
        {
            //var_dump($equipe->getNomEquipe());
            $joueurs = $equipe->getJoueurs();
            $promptUser = "Déroule un match de foot avec l'équipe suivante : ";
            for($i = 0; $i < sizeof($joueurs); $i++)
            {
                if($i+1 == sizeof($joueurs))
                {
                    $promptUser .= $joueurs[$i]->getNom()." ".$joueurs[$i]->getPrenom()." ".$joueurs[$i]->getAge()." poste ".$joueurs[$i]->getPoste()." ".$joueurs[$i]->getDescription().".";
                }
                else
                {
                    $promptUser .= $joueurs[$i]->getNom()." ".$joueurs[$i]->getPrenom()." ".$joueurs[$i]->getAge()." poste ".$joueurs[$i]->getPoste()." ".$joueurs[$i]->getDescription().",";
                }
            }
            $promptSystem = "Tu est un présentateur de match de foot, tu devras séparer les actions du match qui devrons être bien détailler dans leur description dans un tableau en json est noté le score dans un champs json intitulé 'score' comme l'exemple suivant : { ['action': { 'description': 'description d une action', 'score': '0-0', 'joueur_involve': ['Mbappé Kylian', 'Dubois Pierre'], 'minute': '12' }]}  fait au moin 10 temps fort, il ne faut écrire le nombre de minute dans la description, le match peut être gagné ou perdu sois sans pitié";

            $apiKey = $_ENV['OPEN_AI_API_KEY'];

            $url = 'https://api.openai.com/v1/chat/completions';
            $headers = [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $apiKey,
            ];

            $body = json_encode([
                'model' => 'gpt-4-turbo',
                "response_format" => [
                    "type" => "json_object"
                ],
                'messages' => [
                    ['role' => 'system', 'content' => $promptSystem],
                    ['role' => 'user', 'content' => $promptUser]
                ]
            ]);

            try {
                $response = $httpClient->request(
                    'POST',
                    $url,
                    [
                        'headers' => $headers,
                        'body' => $body,
                    ]
                );
                return new JsonResponse(json_decode($response->getContent())->choices[0]->message->content, $response->getStatusCode(), [], true);
            } catch (TransportExceptionInterface|ClientExceptionInterface|RedirectionExceptionInterface|ServerExceptionInterface $e) {
            }
        }
        else
        {
            $tableauRetour["code"] = "0";
            $tableauRetour["message"] = "Unauthorized";
        }
        return $this->json([
            $tableauRetour
        ]);
    }
}
