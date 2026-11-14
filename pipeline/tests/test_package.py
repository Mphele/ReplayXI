from importlib import import_module


def test_package_can_be_imported() -> None:
    package = import_module("replay_xi")

    assert package.__name__ == "replay_xi"
