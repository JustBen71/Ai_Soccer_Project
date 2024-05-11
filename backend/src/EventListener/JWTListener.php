<?php
namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTListener
{
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        // Ajoutez user_id au payload
        $payload = $event->getData();
        $payload['user_id'] = $user->getId();

        $event->setData($payload);
    }
}