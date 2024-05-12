<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Security\Core\User\UserInterface;

#[Route('/user')]
class UserController extends AbstractController
{
    #[Route('/new', name: 'app_user_new', methods:["POST"])]
    public function newUser(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasherInterface): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $user = new User();
        $tableauRetour = [];
        if($data["username"] != null && strlen($data["username"]) <= 255 && filter_var($data["username"], FILTER_VALIDATE_EMAIL))
        {
            if(strlen($data["password"]) > 4 && strlen($data["confirmpassword"]) > 4)
            {
                if($data["password"] == $data["confirmpassword"])
                {
                    $user->setEmail($data["username"]);
                    $user->setRoles(["ROLE_USER"]);
                    $user->setPassword($userPasswordHasherInterface->hashPassword($user, $data["password"]));
                    try {
                        $entityManager->persist($user);
                        $entityManager->flush();
                    }
                    catch (\Exception $ex)
                    {
                        var_dump($ex->getMessage());
                        $tableauRetour["champs"] = "login";
                        $tableauRetour["message"] = "Erreur lors de l'enregistrement vérifier la validité de votre adresse mail";
                    }
                }
                else
                {
                    $tableauRetour["champs"] = "confirmpassword";
                    $tableauRetour["message"] = "Mot de passe différent";
                }
            }
            else
            {
                $tableauRetour["champs"] = "password";
                $tableauRetour["message"] = "Mot de passe trop court";
            }
        }
        else
        {
            $tableauRetour["champs"] = "login";
            $tableauRetour["message"] = "Email invalide";
        }

        return new JsonResponse($tableauRetour);
    }

    #[Route('/', name: 'app_user', methods:["GET"])]
    public function getUserData(UserInterface $user = null): JsonResponse
    {
        if (!$user) {
            return $this->json(['message' => 'Utilisateur non connecté'], 401);
        }

        return $this->json([
            'email' => $user->getEmail(),
            'id' => $user->getId(),
        ]);
    }

    #[Route('/', name: 'app_user_update', methods:["PUT"])]
    public function updateUserData(Request $request, UserInterface $user = null, EntityManagerInterface $entityManager): JsonResponse
    {
        if (!$user) {
            return $this->json(['message' => 'Utilisateur non connecté'], 401);
        }
        else
        {
            $data = json_decode($request->getContent(), true);
            $email = $data['email'];
            $user->setEmail($email);
            $entityManager->flush();
            return $this->json(['message' => 'Adresse email update'], 400);
        }
    }
}
