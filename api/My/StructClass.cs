namespace Ecommerce.Api.My;

public class StructClass
{
    private readonly int _id;

    public StructClass(int id)
    {
        _id = id;
    }

    public string GetMessage()
    {
        return $"Hello, this is a message. {_id}";
    }
}
