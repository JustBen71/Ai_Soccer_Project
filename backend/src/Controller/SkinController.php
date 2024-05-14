<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\User;
use App\Entity\Skin;

#[Route('/skin')]
class SkinController extends AbstractController
{
    #[Route('/', name: 'app_skin')]
    public function getSkinByUser(UserInterface $user = null, EntityManagerInterface $entityManager): JsonResponse
    {
        if($user != null)
        {
            $skins = $entityManager->getRepository(Skin::class)->findAll();
            $skinOfUser = $user->getSkins();
            $skinTableau = [];
            for($i = 0; $i < sizeof($skins); $i++)
            {
                $skinTableau[$i]["nomSkin"] = $skins[$i]->getNom();
                $type = pathinfo($this->getParameter('photos_directory').'/'.$skins[$i]->getImage(), PATHINFO_EXTENSION);
                $file_path = file_get_contents($this->getParameter('photos_directory').'/'.$skins[$i]->getImage());
                $skinTableau[$i]["base64"] = 'data:image/' . $type . ';base64,' . base64_encode($file_path);
                $skinTableau[$i]["idSkin"] = $skins[$i]->getId();
                $skinTableau[$i]["prix"] = $skins[$i]->getPrix();
                for($j = 0; $j < sizeof($skinOfUser); $j++)
                {
                    if($skins[$i]->getId() == $skinOfUser[$j]->getId())
                    {
                        $skinTableau[$i]["acheter"] = true;
                    }
                }
            }
            return new JsonResponse($skinTableau);
        }
        else
        {
            return $this->json([
                'message' => 'Aucun skin trouvé',
                'code' => '0',
            ]);
        }
    }

    #[Route('/{id}', name: 'app_skin_set')]
    public function setSkinToUser(Skin $skin, UserInterface $user = null, EntityManagerInterface $entityManager): JsonResponse
    {
        if($user != null)
        {
            $user->addSkin($skin);
            $entityManager->flush();
            return $this->json([
                'message' => 'Ajouter avec success',
                'code' => '1',
            ]);
        }
        else
        {
            return $this->json([
                'message' => 'Aucun skin trouvé',
                'code' => '0',
            ]);
        }
    }
}
