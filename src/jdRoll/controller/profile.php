<?php
/**
 * User profile controller
 *
 * @package profile
 * @copyright (C) 2013 jdRoll
 * @license MIT
 */


use Symfony\Component\HttpFoundation\Request;

/*
    Controller du profile
*/
$profileController = $app['controllers_factory'];
$profileController->before($mustBeLogged);

$profileController->get('/', function() use($app) {
    $user = $app["userService"]->getCurrentUser();
    return $app->render('user/profile_edit.html.twig', ['user' => $user, 'error' => ""]);
})->bind("my_profile");

$profileController->post('/save', function(Request $request) use($app) {
    $user = $app["userService"]->updateCurrentUser($request);
    return $app->render('user/profile_edit.html.twig', ['user' => $user, 'error' => ""]);
})->bind("my_profile_save");

$profileController->post('/save/cfg', function(Request $request) use($app) {
    $user = $app["userService"]->updateCurrentConfig($request);
    return $app->render('user/profile_edit.html.twig', ['user' => $user, 'error' => ""]);
})->bind("my_profile_cfg_save");

$profileController->post('/passwd', function(Request $request) use($app) {
    $error = "";
    try {
        $app["userService"]->changePassword($request);
    } catch (Exception $e) {
        $error = $e->getMessage();
    }
    $user = $app["userService"]->getCurrentUser();
    return $app->render('user/profile_edit.html.twig', ['user' => $user, 'error' => $error]);
})->bind("my_profile_passwd");

$profileController->get('/absences', function() use($app) {
    $absence_form = $app["absenceService"]->getBlankForm($app['session']->get('user')['id']);
    $absences = $app["absenceService"]->getAllAbsence($app['session']->get('user')['id']);
    return $app->render('absences.html.twig', ['absences' => $absences, 'absence_form' => $absence_form, 'error' => ""]);
})->bind("abs");

$profileController->get('/absences/edit/{id}', function($id) use($app) {
    $absence_form = $app["absenceService"]->getAbsence($id);
    $absences = $app["absenceService"]->getAllAbsence($app['session']->get('user')['id']);
    return $app->render('absences.html.twig', ['absences' => $absences,'absence_form' => $absence_form, 'error' => ""]);
})->bind("abs_edit");

$profileController->get('/absences/remove/{id}', function($id) use($app) {
    $app["absenceService"]->deleteAbsence($id);
    return $app->redirect($app->path('abs'));
})->bind("abs_remove");

$profileController->post('/absences/save', function(Request $request) use($app) {
    if ($request->get('id') == 0) {
        $app["absenceService"]->insertAbsence($request);
    } else {
        $app["absenceService"]->updateAbsence($request);
    }
    return $app->redirect($app->path('abs'));
})->bind("abs_save");

$profileController->get('/config', function() use($app) {
    return $app->render('config.html.twig', []);
})->bind("user_conf");

$profileController->get('/stat', function() use($app) {
    $user = $app["userService"]->getCurrentUser();
    $data = $app['postService']->getStatPost($user);
    $games = $app['postService']->getStatByGame($user);
    $total = $app['postService']->getTotalPost($user);

    return $app->render('user/stat.html.twig', [
        'total'=> $total,
        'data' => $data,
        'games_data' => $games]);
})->bind("user_stat");

$app->mount('/my_profile', $profileController);

?>
