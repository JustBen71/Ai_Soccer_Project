<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/user')]
class UserController extends AbstractController
{
    #[Route('/new', name: 'app_user_new')]
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

    #[Route('/', name: 'app_user', method:["GET"])]
    public function getUser() : JsonResponse
    {
        return $this->json([
            'user' => $this->getUser()->getId()
        ]);
    }
}
