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
    public function newUser(EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasherInterface): JsonResponse
    {
        $user = new User();
        $user->setEmail("admin@gmail.com");
        $user->setRoles(["ROLE_USER"]);
        $user->setPassword($userPasswordHasherInterface->hashPassword($user, "admin"));
        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse($user);
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
